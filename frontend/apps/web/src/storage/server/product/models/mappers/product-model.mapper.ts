import {IProductResponseModel} from "../response/product.response-model";
import {
    IProductCardModel
} from "../../../../../app/children/marketplace-zone/routing/catalog/models/product-card.model";

export function productModelMapper(data: IProductResponseModel): IProductCardModel {
    return {
        id: data.id,
        name: data.name,
        image: data.preview,
        isFree: data.isFree ?? false
    }
}
