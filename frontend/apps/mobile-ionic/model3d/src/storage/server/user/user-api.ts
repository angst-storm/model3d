import {baseApi} from "../base-api";
import {IUserResponseModel} from "./models/response/user.response-model";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userById: builder.query<IUserResponseModel, number>({
            query: (id: number) => ({
                url: `users/${id}/`,
                method: 'GET'
            })
        })
    })
})

export const {
    useLazyUserByIdQuery
} = userApi
