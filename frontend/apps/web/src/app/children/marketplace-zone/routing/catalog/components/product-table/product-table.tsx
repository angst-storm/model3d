import './product-table.css'
import {ProductCard} from "../product-card/product-card";
import {IProductCardModel} from "../product-card/models/product-card.model";

export interface IProductTableProps {
    className?: string
}

export function ProductTable(props: IProductTableProps) {
    const productList: IProductCardModel[] = [
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
        {
            id: '234',
            name: 'тумбочка тумбочка тумбочка',
            image: 'https://avatars.mds.yandex.net/get-mpic/4835126/img_id5948703693318203252.jpeg/600x800'
        },
    ]

    return <div className={`product-table ${props.className ?? ''}`}>
        {
            productList.map((productCardModel: IProductCardModel, index: number) => {
                return <ProductCard key={productCardModel.id} productCardModel={productCardModel} index={index + 1}></ProductCard>
            })
        }
    </div>
}
