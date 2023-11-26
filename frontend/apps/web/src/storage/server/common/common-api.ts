import {baseApi} from "../base-api";
import {IInfoDocsResponseModel} from "./models/response/info-docs.response-model";


export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        infoDocs: builder.query<IInfoDocsResponseModel, void>({
            query: () => ({
                url: 'infoDocs',
                method: 'GET'
            })
        }),
    })
})

export const {
    useInfoDocsQuery
} = commonApi

