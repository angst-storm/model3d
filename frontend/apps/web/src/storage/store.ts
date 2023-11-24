import {configureStore} from "@reduxjs/toolkit";
import sliceReducer from "./authorizedSlice";

export const store = configureStore({
    reducer: {
        authorized: sliceReducer
    }
})
