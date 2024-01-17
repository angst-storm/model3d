import {IProductResponseModel} from "../response/product.response-model";
import {IProductCardModel} from "../../../../../pages/catalog/models/product-card.model";
import {IFilterBaseResponseModel} from "../response/filter-base.response-model";

export function productModelMapper(data: IProductResponseModel): IProductCardModel {
    return {
        id: data.id,
        name: data.name,
        image: data.preview,
        isFree: data.isFree ?? false,
        purchaseCount: data.purchaseCount ?? 0,
        cost: data.cost,
        articul: data.articul,
        formats: data.formats,
        render: data.render,
        style: data.style,
        colors: data.colors,
        materials: data.materials,
        form: data.form,
        platform: data.platform,
        isPopular: data.isPopular,
        size: data.size,
        polygonsCount: data.polygonsCount,
        buyUrl: data.buyUrl,
        description: data.description,
        publicationDate: data.publicationDate,
        author: data.author,
        archive: data.archive,
        category: data.category,
        modelFileSizeBytes: data.modelFileSizeBytes,
        files: data.files
    }
}
