export interface Slider {
    sort: number;
    name: string;

    interval: {
        start: number;
        end: number;
    };

    slides: {
        name: string;
        description: string;
    }[];
}

export type Sliders = Slider[]