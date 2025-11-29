import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Route, RoutesState } from '../types';


const initialState: RoutesState = {
    activeRouteId: "",
    ids: {},
    list: []
};

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {

        setRoute(state, action: PayloadAction<Route>) {
            console.log(action.payload);
        },

        setRoutes(state, action: PayloadAction<Route[]>) {
            state.ids = {};
            state.list = []

            action.payload.forEach(route => {
                state.ids[route.id] = route;
                state.list.push(route)
            });

        }
    }
});

export const routesActions = routesSlice.actions;
export const routesReducer = routesSlice.reducer
