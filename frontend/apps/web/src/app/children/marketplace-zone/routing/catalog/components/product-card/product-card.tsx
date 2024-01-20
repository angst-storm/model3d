import './product-card.css'
import {IProductCardModel} from "./models/product-card.model";
import {useEffect, useRef} from "react";
import ripple from "ripple-effects";

export interface IProductCardProps {
    productCardModel: IProductCardModel,
    index: number
}

export function ProductCard(props: IProductCardProps) {
    const button = useRef<HTMLDivElement>(null);
    useEffect(() => {
        ripple(button.current as HTMLDivElement, {
            background: 'blue',
            opacity: 0.01
        })
    }, [])

    return <div className={'card-layout'}>
        <img src={props.productCardModel?.image} className={'product-image'}/>
        <p className={'product-name M3-body-s'}>{props.index + ' ' + props.productCardModel.name}</p>
        <div className={'card-details'}>
            <div className={'pro-label M3-label-s'}>
                PRO
            </div>
            <div ref={button} className={'rounded-button'}>
                <img className={'favorite-image no-select'} src={require('@assets/icons/svg/heart.svg').default}/>
            </div>
            <div className={'favorite-count M3-label-s'}>
                {props.productCardModel.favoriteNumber ?? 0}
            </div>
        </div>
    </div>
}
