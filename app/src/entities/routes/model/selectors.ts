import type { RootState } from "@app/store";
import { createSelector } from "@reduxjs/toolkit";


export const selectRoutesList = createSelector(
    (state: RootState) => state.routes.ids,
    (ids) => Object.values(ids)
);

// export const selectRoutes = createSelector(
//     selectRoutesList,
//     (routes) => routes.filter(route => route.isActive)
// );