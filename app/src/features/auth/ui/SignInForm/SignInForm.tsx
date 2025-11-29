import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";


import { Input, type InputMessageType } from "@shared/ui/components/Input"
import { ProgressBarLine, useProgress } from "@shared/ui/progress";
import type { SuccessResponse } from "@shared/api";

import { useAuth } from "@features/auth";
import { AuthAPI } from "@features/auth/api";

import type { User } from "@entities/user";


import formStyles from '@styles/modules/form.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";





export const SignInForm = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});

    const { progress, isLoading, startProgress, completeProgress } = useProgress()
    const { signIn } = useAuth()


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setMessages({})

        if (!login) {
            setMessages(prev => ({
                ...prev,
                login: {
                    text: "Введите логин",
                    type: "danger"
                }
            }))
        }
        if (!password) {
            setMessages(prev => ({
                ...prev,
                password: {
                    text: "Введите пароль",
                    type: "danger"
                }
            }))
        }

        if (!login || !password) return

        startProgress()

        try {
            const response = await AuthAPI.login({ login, password })
            if (!response.success && response.error) {
                if (response.error!.fields) {
                    setMessages(response.error.fields)
                }
                return
            }

            signIn((response as SuccessResponse<User>).data)
        } catch (error) {
          console.error(error);
            
        } finally {
            completeProgress()
        }
    }


    return (<>
        <div className={formStyles.wrapper}>
            <div className={classNames(formStyles.title, "font-h1 font-color")}>Войти</div>

            <form
                className={classNames(formStyles.form, isLoading && formStyles.formLoading)}
                onSubmit={handleSubmit}
            >
                <ProgressBarLine progress={progress} isLoading={isLoading} />

                <Input
                    name="login"
                    externalMessage={messages.login}

                    placeholder="Логин"
                    onChange={setLogin}

                    className={formStyles.formItem}
                    required
                />

                <Input
                    name="password"
                    externalMessage={messages.password}

                    type="password"
                    placeholder="Пароль"
                    onChange={setPassword}

                    className={formStyles.formItem}
                    required
                />

                <button className={classNames(buttonStyles.button, formStyles.formItem)}>
                    Войти
                </button>
            </form>

            <Link to="/auth/signup" className={formStyles.link}>У меня нет аккаунта</Link>
        </div>
    </>);
};