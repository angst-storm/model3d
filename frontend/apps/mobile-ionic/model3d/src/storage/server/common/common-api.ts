import {baseApi} from "../base-api";
import {IInfoDocsResponseModel} from "./models/response/info-docs.response-model";
import {ISiteSettingsResponseModel} from "./models/response/site-settings.response-model";
import {ISiteSettingsModel} from "./models/inapp/site-settings.model";
import {siteSettingsMapper} from "./models/mappers/site-settings.mapper";


export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        infoDocs: builder.query<IInfoDocsResponseModel, void>({
            query: () => ({
                url: 'infoDocs/',
                method: 'GET'
            })
        }),
        siteSettings: builder.query<ISiteSettingsModel | undefined, void>({
            query: () => ({
                url: 'siteSettings/',
                method: 'GET'
            }),
            transformResponse(value: ISiteSettingsResponseModel, meta, params) {
                return siteSettingsMapper(value)
            }
        }),
    })
})

export const {
    useInfoDocsQuery,
    useSiteSettingsQuery
} = commonApi
