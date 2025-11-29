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
            id: "DSE425",
            name: "Вологда - река",
            points: [1, 2, 3]
        },
        {
            id: "DSE425",
            name: "Осановская тайна",
            points: [1, 2, 3, 4, 5]
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
            id: "DSE425",
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

        const routes = mock.filter(r => true)


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