export type Points = string | number


export interface RouteDetails {
    description: string;
}

export interface Route {
    id: string;
    name: string;
    points?: Points[]
}


export interface RoutesState {
    activeRouteId: string;

    ids: {
        [key: string]: Route;
    },

    list: Route[]
}