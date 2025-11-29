import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Route, RoutesState } from '../types';


const initialState: RoutesState = {
    activeRoute: null,
    ids: {}
};

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {

        setRoute(state, action: PayloadAction<Route>) {
            const ids = state.ids

            state.ids = {
                ...ids,
                [action.payload.id]: action.payload
            }
        },

        setRoutes(state, action: PayloadAction<Route[]>) {
            const ids = state.ids;

            action.payload.forEach(route => {
                ids[route.id] = route;
            });

            state.ids = ids
        },

        setActiveRoute(state, action: PayloadAction<Route>) {
            state.activeRoute = action.payload
        }
    }
});

export const routesActions = routesSlice.actions;
export const routesReducer = routesSlice.reducer
