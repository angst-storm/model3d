import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useLazyProductByIdQuery, useLazyUserByIdQuery} from "@storage";
import styles from './product-details.module.css'
import {IProductCardModel} from "../catalog/models/product-card.model";
import {M3dButton} from "@model3d/controls";
import * as OV from 'online-3d-viewer'

export function ProductDetails() {
    const routeParams = useParams();

    const [
        productRequestTrigger,
        productRequestState
    ] = useLazyProductByIdQuery()

    const [
        authorRequestTrigger,
        authorRequestState
    ] = useLazyUserByIdQuery()

    const [characteristicsList, setCharacteristicsList] = useState([] as string[])
    const [model, setModel] = useState<string | undefined>()

    let viewer: OV.EmbeddedViewer;
    const viewerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (routeParams.id) {
            productRequestTrigger(parseInt(routeParams.id))
        }
    }, [routeParams]);

    useEffect(() => {
        updateCharacteristics(productRequestState.currentData)
        if (productRequestState.currentData?.author) {
            authorRequestTrigger(productRequestState.currentData?.author)
        }
    }, [productRequestState])

    useEffect(() => {
        updateCharacteristics(productRequestState.currentData)

        setModel(
            productRequestState.currentData?.files
                ?.filter((value) => value.format.name !== '.c3d')
                ?.map((value) => value.file)[0]
        )
    }, [productRequestState])

    useEffect(() => {
        if (productRequestState.currentData?.author) {
            if (!viewer) {
                viewer = new OV.EmbeddedViewer (viewerRef.current as HTMLDivElement, {
                    camera : new OV.Camera (
                        new OV.Coord3D (-1.5, 2.0, 3.0),
                        new OV.Coord3D (0.0, 0.0, 0.0),
                        new OV.Coord3D (0.0, 1.0, 0.0),
                        45.0
                    ),
                    backgroundColor : new OV.RGBAColor (230, 230, 230, 255),
                    defaultColor : new OV.RGBColor (200, 200, 200),
                    edgeSettings : new OV.EdgeSettings (false, new OV.RGBColor (0, 0, 0), 1)
                });
            }

            initModel()
        }
    }, [model])

    function updateCharacteristics(data: IProductCardModel | undefined) {
        if (data) {
            const characteristicArray: string[] = []

            if (data.platform) {
                characteristicArray.push(`Платформа: ${data.platform}`)
            }

            if (data.formats?.length) {
                characteristicArray.push(`Форматы: ${data.formats.map((value) => value.name).join(', ')}`)
            }

            if (data.render?.length) {
                characteristicArray.push(`Render: ${data.render.map((value) => value.name).join(', ')}`)
            }

            if (data.modelFileSizeBytes) {
                characteristicArray.push(`Размер файла: ${data.modelFileSizeBytes}`)
            }

            if (data.style?.length) {
                characteristicArray.push(`Стиль: ${data.style.map((value) => value.name).join(', ')}`)
            }

            if (data.materials?.length) {
                characteristicArray.push(`Материалы: ${data.materials.map((value) => value.name).join(', ')}`)
            }

            if (data.form?.length) {
                characteristicArray.push(`Форма: ${data.form.map((value) => value.name).join(', ')}`)
            }

            if (data.polygonsCount) {
                characteristicArray.push(`Количество полигонов: ${data.polygonsCount}`)
            }

            if (data.articul) {
                characteristicArray.push(`Артикул: ${data.articul}`)
            }

            if (data.buyUrl) {
                characteristicArray.push(`Купить: ${data.buyUrl}`)
            }

            if (data.description) {
                characteristicArray.push(`Описание: ${data.description}`)
            }

            if (data.publicationDate) {
                characteristicArray.push(`Дата публикации: ${new Date(data.publicationDate).toLocaleDateString('ru-RU')}`)
            }

            setCharacteristicsList(characteristicArray)
        }
    }

    function initModel() {
        if (viewer && model) {
            viewer.LoadModelFromUrlList([model]);
        }

        // setModelLoading(false)
    }

    return <div className={`${styles['product-details']} grid-container`}>
        {
            productRequestState.currentData && !productRequestState.isLoading && <>
                <div className={`${styles['characteristics-block']} grid-element`} style={{'--grid-column-from': 1, '--grid-column-to': 9}}>
                    <div className={`${styles['title-row']}`}>
                        <h1 className={`${styles['title']} M3-headline-m`}>{productRequestState.currentData.name}</h1>
                        <img src={require('@assets/icons/svg/heart.svg').default}/>
                        <span className={`${styles['purchase-count']} M3-title-m`}>{productRequestState.currentData.purchaseCount}</span>
                    </div>
                    <div className={`${styles['image-block']}`}>
                        <div className={`${styles['gallery']}`}>
                            {
                                [productRequestState.currentData.image].map((image) => {
                                    return <img className={`${styles['gallery-image']}`} src={image}/>
                                })
                            }
                        </div>
                        {
                            !model && <img className={`${styles['active-image']}`} src={productRequestState.currentData.image}/>
                        }
                        {
                            model && <div className={`${styles['viewer']}`} ref={viewerRef}></div>
                        }
                    </div>
                    <div className={`${styles['characteristics']}`}>
                        <h1 className={`${styles['characteristics-title']} M3-headline-m`}>Характеристики</h1>
                        <ul className={`${styles['characteristics-list']}`}>
                            {
                                characteristicsList.map((characteristic) => {
                                    return <li className={`${styles['characteristics-element']}`}>{characteristic}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={`${styles['other-block']} grid-element`} style={{'--grid-column-from': 10, '--grid-column-to': 12}}>
                    {
                        authorRequestState.currentData && <div className={`${styles['author-block']}`}>
                            <img src={authorRequestState.currentData.image} className={`${styles['author-avatar']}`}/>
                            <div className={`${styles['author-info']}`}>
                                <div className={`${styles['author-name']} M3-label-l`}>
                                    {authorRequestState.currentData.login}
                                </div>
                                <div className={`${styles['author-details']}`}>
                                    {
                                        authorRequestState.currentData.rating && <>
                                            <img className={`${styles['author-star-icon']}`}
                                                 src={require('@assets/icons/svg/yellow-star.svg').default}/>
                                            <span
                                                className={`${styles['author-star-value']} M3-body-s`}>{authorRequestState.currentData.rating}</span>
                                        </>
                                    }
                                    {
                                        authorRequestState.currentData.productsCount && <span
                                            className={`${styles['author-responses']} M3-body-s`}>{authorRequestState.currentData.productsCount} моделей</span>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {
                        productRequestState.currentData && <div className={`${styles['buy-block']}`}>
                            <div className={`${styles['price-line']}`}>
                                <span className={`${styles['price']} M3-headline-s`}>
                                    {productRequestState.currentData.cost} ₽
                                </span>
                                <div className={`${styles['price-label']} M3-label-s`} data-free={productRequestState.currentData.isFree}>
                                    {productRequestState.currentData.isFree ? 'Free' : 'PRO'}
                                </div>
                            </div>
                            <M3dButton className={`${styles['buy-button']}`}>Добавить в корзину</M3dButton>
                        </div>
                    }
                </div>
            </>
        }
    </div>
}
