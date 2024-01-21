import {baseApi} from "../base-api";
import {IProductResponseModel} from "./models/response/product.response-model";
import {IProductListParamsModel} from "./models/params/product-list.params-model";
import {productModelMapper} from "./models/mappers/product-model.mapper";
import {IPaginationResponseModel} from "./models/response/pagination.response-model";
import {IProductCardModel} from "../../../app/children/marketplace-zone/routing/catalog/models/product-card.model";
import {IPageModel} from "./models/inapp/page-model";
import {IFilterListResponseModel} from "./models/response/filter-list.response-model";


export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query<IPageModel<IProductCardModel>, IProductListParamsModel>({
            query: (params: IProductListParamsModel) => ({
                url: 'products/',
                method: 'GET',
                params: params
            }),
            transformResponse(value: IPaginationResponseModel<IProductResponseModel>, meta, params) {
                return {
                    next: value.next,
                    allCount: value.count,
                    previous: value.previous,
                    results: value.results.map((productData) => productModelMapper(productData))
                }
            }
        }),
        productById: builder.query<IProductCardModel, number>({
            query: (id: number) => ({
                url: `products/${id}/`,
                method: 'GET'
            }),
            transformResponse(value: IProductResponseModel, meta, params) {
                return productModelMapper(value)
            }
        }),
        filterList: builder.query<IFilterListResponseModel, void>({
            query: () => ({
                url: `filters/`,
                method: 'GET'
            })
        })
    })
})

export const {
    useProductByIdQuery,
    useProductsQuery,
    useLazyProductsQuery,
    useLazyProductByIdQuery,
    useLazyFilterListQuery,
    useFilterListQuery
} = productApi
