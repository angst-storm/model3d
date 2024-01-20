import {baseApi} from "../base-api";
import {IInfoDocsResponseModel} from "./models/response/info-docs.response-model";
import {ISiteSettingsResponseModel} from "./models/response/site-settings.response-model";


export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        infoDocs: builder.query<IInfoDocsResponseModel, void>({
            query: () => ({
                url: 'infoDocs',
                method: 'GET'
            })
        }),
        siteSettings: builder.query<ISiteSettingsResponseModel, void>({
            query: () => ({
                url: 'siteSettings',
                method: 'GET'
            })
        }),
    })
})

export const {
    useInfoDocsQuery,
    useSiteSettingsQuery
} = commonApi
