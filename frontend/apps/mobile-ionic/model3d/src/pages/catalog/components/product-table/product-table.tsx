import './product-table.css'
import {ProductCard} from "../product-card/product-card";
import {IProductCardModel} from "../../models/product-card.model";
import React from "react";

export interface IProductTableProps {
    className?: string,
    products: IProductCardModel[]
}

export function ProductTable(props: IProductTableProps) {
    return <div className={`product-table ${props.className ?? ''}`}>
        {
            props.products.map((productCardModel: IProductCardModel, index: number) => {
                return <ProductCard key={productCardModel.id} productCardModel={productCardModel}></ProductCard>
            })
        }
    </div>
}
