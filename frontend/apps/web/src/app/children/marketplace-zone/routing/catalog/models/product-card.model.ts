import {
    IFilterBaseResponseModel
} from "../../../../../../storage/server/product/models/response/filter-base.response-model";
import {
    IColorFilterResponseModel
} from "../../../../../../storage/server/product/models/response/color-filter.response-model";
import {ICategoryResponseModel} from "../../../../../../storage/server/product/models/response/category.response-model";

export interface IProductCardModel {
    id: number
    name: string
    isFree?: boolean
    image?: string
    purchaseCount?: number,
    cost?: number
    articul?: string
    formats?: IFilterBaseResponseModel[],
    render?: IFilterBaseResponseModel[],
    style?: IFilterBaseResponseModel[],
    colors?: IColorFilterResponseModel[]
    materials?: IFilterBaseResponseModel[],
    form?: IFilterBaseResponseModel[],
    tags?: IFilterBaseResponseModel[],
    platform?: string,
    isPopular?: boolean,
    size?: string,
    polygonsCount?: number,
    buyUrl?: string,
    description?: string,
    publicationDate?: string,
    author?: number,
    archive?: boolean,
    category?: ICategoryResponseModel,
    modelFileSizeBytes?: string
}
