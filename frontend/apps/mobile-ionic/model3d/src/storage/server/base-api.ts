import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {REACT_APP_BASE_ENDPOINT} from "../../constants/base-endpoint";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_APP_BASE_ENDPOINT + 'api/'
    }),
    endpoints: (builder) => ({})
})
