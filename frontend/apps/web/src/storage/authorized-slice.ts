import {createSlice} from "@reduxjs/toolkit";

const AUTH_KEY: 'AUTH_KEY' = 'AUTH_KEY';

const authorizedSlice = createSlice({
    name: 'is-authorized',
    initialState: () => (localStorage.getItem(AUTH_KEY) === 'true'),
    reducers: {
        authorize: (state) => {
            localStorage.setItem(AUTH_KEY, 'true')

            return state
        },
        unauthorize: (state) => {
            localStorage.removeItem(AUTH_KEY)

            return state
        }
    }
});

export const { authorize, unauthorize } = authorizedSlice.actions;
export default authorizedSlice.reducer
