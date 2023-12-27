import './product-card.css'
import {useEffect, useRef} from "react";
import ripple from "ripple-effects";
import {useNavigate} from "react-router-dom";
import {IProductCardModel} from "../../models/product-card.model";

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

    const navigate = useNavigate();

    function toDetails() {
        navigate(`/product/${props.productCardModel.id}`)
    }

    return <div className={'card-layout'}>
        <img src={props.productCardModel?.image} className={'product-image'} onClick={toDetails}/>
        <p className={'product-name M3-body-s'} onClick={toDetails}>{props.productCardModel.name}</p>
        <div className={'card-details'}>
            <div className={'cost-label M3-label-s'} data-free={props.productCardModel.isFree}>
                { props.productCardModel.isFree ? 'Free' : 'PRO' }
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
