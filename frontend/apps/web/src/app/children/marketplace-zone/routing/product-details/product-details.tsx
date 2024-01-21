import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useLazyProductByIdQuery} from "@storage";
import styles from './product-details.module.css'

export function ProductDetails() {
    const routeParams = useParams();

    const [
        productRequestTrigger,
        productRequestState
    ] = useLazyProductByIdQuery()

    useEffect(() => {
        if (routeParams.id) {
            productRequestTrigger(parseInt(routeParams.id))
        }
    }, [routeParams]);

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
                        <img className={`${styles['active-image']}`} src={productRequestState.currentData.image}/>
                    </div>
                </div>
                <div className={`${styles['other-block']} grid-element`} style={{'--grid-column-from': 10, '--grid-column-to': 12}}>
                    Тут всякое
                </div>
            </>
        }
    </div>
}
