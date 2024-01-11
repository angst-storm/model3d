import './product-card.css'
import {useEffect, useRef} from "react";
import ripple from "ripple-effects";
import {IProductCardModel} from "../../models/product-card.model";
import {history} from "../../../../history";
import React from "react";

export interface IProductCardProps {
    productCardModel: IProductCardModel
}

export function ProductCard(props: IProductCardProps) {
    const button = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ripple(button.current as HTMLDivElement, {
            background: 'blue',
            opacity: 0.01
        })
    }, [])

    function toDetails() {
        history.push(`/product/${props.productCardModel.id}`)
    }

    return <div className={'card-layout'}>
        <img src={props.productCardModel?.image} className={'product-image'} onClick={toDetails}/>
        <p className={'product-name M3-body-s'} onClick={toDetails}>{props.productCardModel.name}</p>
        <div className={'card-details'}>
            {
                props.productCardModel.isFree && <div className={'cost-label M3-label-s'}>
                    Free
                </div>
            }
            {
                !props.productCardModel.isFree && <div className={'cost M3-label-s'}>
                    {props.productCardModel.cost} ₽
                </div>
            }
            <div ref={button} className={'rounded-button'}>
                <img className={'favorite-image no-select'} src={require('@assets/icons/svg/heart.svg').default}/>
            </div>
            <div className={'favorite-count M3-label-s'}>
                {props.productCardModel.purchaseCount ?? 0}
            </div>
        </div>
    </div>
}
