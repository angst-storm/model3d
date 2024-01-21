import {ICategoryResponseModel} from "./category.response-model";
import {IColorFilterResponseModel} from "./color-filter.response-model";
import {IFilterBaseResponseModel} from "./filter-base.response-model";

export interface IFilterListResponseModel {
    categoriesTree: ICategoryResponseModel[],
    colors: IColorFilterResponseModel[],
    formats: IFilterBaseResponseModel[],
    forms: IFilterBaseResponseModel[],
    materials: IFilterBaseResponseModel[],
    renders: IFilterBaseResponseModel[],
    styles: IFilterBaseResponseModel[],
    tags: IFilterBaseResponseModel[],
}
