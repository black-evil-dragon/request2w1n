import type { User } from "@entities/user";
import { sleep, type Response } from "@shared/api";



export const AuthAPI = {
    async register(data: {
        login: string;
        password: string;
    }): Promise<Response> {
        const mockAccounts = ["test"]

        if (!mockAccounts.includes(data.login)) {
            await sleep()
            return Promise.resolve({
                success: true,
                code: 200,
                data: {
                    userId: "434113413",
                }
            })
        }

        await sleep(1000)
        return Promise.resolve({
            success: false,
            code: 400,
            error: {
                text: "Пользователь с таким логином уже существует",

                fields: {
                    login: {
                        text: "Логин уже существует",
                    }
                }
            }
        })
    },

    async login(data: {
        login: string;
        password: string;
    }): Promise<Response<User>> {
        const mockAccounts: {[key: string]: { password: string }} = {
            test: {
                password: "1234"
            }
        }

        if (
            mockAccounts[data.login]
            && mockAccounts[data.login].password == data.password
        ) {
            await sleep()

            return Promise.resolve({
                success: true,
                code: 200,
                data: {
                    id: "434113413",
                    login: "test",
                    name: "Test test",
                }
            })
        }

        if (mockAccounts[data.login]) {
            await sleep(1000)
            return Promise.resolve({
                success: false,
                code: 400,
                error: {
                    text: "Пользователь с таким логином и паролем не существует",

                    fields: {
                        login: {
                            text: "Неверные данные",
                            type: "danger"
                        },
                        password: {
                            text: "Неверные данные",
                            type: "danger"
                        }
                    }
                }
            })
        }

        await sleep(1000)
        return Promise.resolve({
            success: false,
            code: 400,
            error: {
                text: "Пользователь с таким логином не существует",

                fields: {
                    login: {
                        text: "Не существует",
                        type: "danger"
                    }
                }
            }
        })
    }
}