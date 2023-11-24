import {createSlice} from "@reduxjs/toolkit";

const authorizedSlice = createSlice({
    name: 'is-authorized',
    initialState: {
        value: false
    },
    reducers: {
        authorize: (state) => {
            state.value = true;
        },
        unauthorize: (state) => {
            state.value = false;
        }
    }
});

export const { authorize, unauthorize } = authorizedSlice.actions;
export default authorizedSlice.reducer
