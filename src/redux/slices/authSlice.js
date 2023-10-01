import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: null
    },
    reducers: {
        setUser(state,action){
            state.user = action.payload;
            console.log(state.user);
        },
        getUser(state,action){
            state.user = action.payload;
            console.log(state.user)
        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;