import type { Route } from "@entities/routes";
import { sleep, type Response } from "@shared/api";



export const RouteAPI = {


    async find(id: string): Promise<Response> {
        const mock = ["DFE425"]

        if (mock.includes(id)) {
            return Promise.resolve({
                success: true,
                code: 200,
                data: {
                    id: id
                }
            })
        }

        await sleep(1000)

        return Promise.resolve({
            success: false,
            code: 404,
            error: {
                text: "Not found",

                fields: {
                    routeId: {
                        text: "Не найден",
                        type: "danger"
                    }
                }
            }
        })
    },


    async get(id: string): Promise<Response<Route>> {
        const mock = [{
            id: "DFE425",
            name: "Вологда - река",
            points: [{
                name: "Площадка",
                x: 59.191499,
                y: 39.878187,
                distance: {
                    next: 243,
                }
            }, {
                name: "Скамейка",
                x: 59.192474,
                y: 39.880549,
                distance: {
                    next: 243 + 103,
                }
            }, {
                name: "Красивое дерево",
                x: 59.191032,
                y: 39.877579,
                distance: {
                    // next: 314,
                }
            }]
        },
        {
            id: "AAA777",
            name: "Осановская тайна",
            points: [{
                name: "Площадка",
                x: 59.191499,
                y: 39.878187,
                distance: {
                    next: 135,
                }
            }, {
                name: "Скамейка",
                x: 59.192474,
                y: 39.880549,
                distance: {
                    next: 143,
                }
            }, {
                name: "Красивое дерево",
                x: 59.191032,
                y: 39.877579,
                distance: {
                    // next: 314,
                }
            }]
        }]

        const route = mock.find(r => r.id === id)


        if (route) {
            return Promise.resolve({
                success: true,
                code: 200,
                data: route
            })
        }

        return Promise.resolve({
            success: false,
            code: 404,
            error: {
                text: "Маршрут не найден"
            }
        })
    },

    async filter(ids: string[]): Promise<Response<Route[] | []>> {
        const mock = [{
            id: "DFE425",
            name: "Вологда - река",
            points: [1, 2, 3]
        },
        {
            id: "BLL186",
            name: "Осановская тайна",
            points: [1, 2, 3, 4, 5]
        },
        {
            id: "ADS9314",
            name: "Осановская тайна",
            points: [1, 2, 3, 4, 5]
        },
        {
            id: "AAA777",
            name: "Осановская тайна",
            points: [1, 2, 3, 4, 5]
        }]

        const routes = mock.filter(r => ids.includes(r.id))


        if (routes) {
            return Promise.resolve({
                success: true,
                code: 200,
                data: routes
            })
        }

        return Promise.resolve({
            success: false,
            code: 404,
            error: {
                text: "Маршруты не найдены"
            }
        })
    }
}