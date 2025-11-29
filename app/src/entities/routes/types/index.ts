export type Point = {
    name: string;
    x: number;
    y: number;
    distance: {
        prev?: number,
        next?: number,
    }
}


export interface RouteDetails {
    description: string;
}

export interface Route {
    id: string;
    name: string;
    points?: Point[]
}


export interface RoutesState {
    activeRoute: Route | null;

    ids: {
        [key: string]: Route;
    },
}