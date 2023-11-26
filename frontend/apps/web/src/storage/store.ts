import { configureStore} from "@reduxjs/toolkit";
import sliceReducer from "./authorizedSlice";
import {baseApi} from "./server/base-api";

export const store = configureStore({
    reducer: {
        authorized: sliceReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})
