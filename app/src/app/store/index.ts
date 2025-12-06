import { configureStore } from '@reduxjs/toolkit';


import { chatReducer } from '@entities/chat';
import { userReducer } from '@entities/user';
import { routesReducer } from '@entities/routes';



export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,

        routes: routesReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;