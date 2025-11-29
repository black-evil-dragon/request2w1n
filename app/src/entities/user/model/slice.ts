import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


import type { User, UserData } from '../types';




type UserState = User | UserData

const initialState: UserState = {
    id: "",
    login: "",
    name: "",
    phone: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        setUser(state, action: PayloadAction<User>) {
            state.id = action.payload.id
            state.login = action.payload.login
        }
    }
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer
