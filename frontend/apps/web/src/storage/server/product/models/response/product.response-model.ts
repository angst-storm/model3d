import {IColorFilterResponseModel} from "./color-filter.response-model";
import {IFilterBaseResponseModel} from "./filter-base.response-model";
import {ICategoryResponseModel} from "./category.response-model";

export interface IProductResponseModel {
    id: number,
    name: string,
    cost: number,
    articul: string
    formats: IFilterBaseResponseModel[],
    render: IFilterBaseResponseModel[],
    style: IFilterBaseResponseModel[],
    colors: IColorFilterResponseModel[]
    materials: IFilterBaseResponseModel[],
    form: IFilterBaseResponseModel[],
    tags: IFilterBaseResponseModel[],
    platform: string,
    isPopular: boolean,
    size: string,
    polygonsCount: number,
    buyUrl: string,
    description: string,
    publicationDate: string,
    author: number,
    archive: boolean,
    category: ICategoryResponseModel,
    isFree: boolean,
    modelFileSizeBytes: string,
    preview: string,
    purchaseCount: number
}
