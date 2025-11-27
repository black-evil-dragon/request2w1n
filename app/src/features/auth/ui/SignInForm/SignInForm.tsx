import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";


import { Input, type InputMessageType } from "@shared/ui/components/Input"
import { ProgressBarLine, useProgress } from "@shared/ui/progress";

import { useAuth } from "@features/auth";
import { AuthAPI } from "@features/auth/api";


import styles from '../styles/form.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";
import type { SuccessResponse } from "@shared/api";
import type { User } from "@entities/user";




export const SignInForm = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});

    const { progress, isLoading, startProgress, completeProgress } = useProgress()
    const { signIn } = useAuth()


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
        AuthAPI.login({ login, password }).then(response => {
            if (!response.success && response.error) {
                completeProgress()
                if (response.error!.fields) {
                    setMessages(response.error.fields)
                }
                
                return
            }

            completeProgress(() => { signIn((response as SuccessResponse<User>).data) })


        })
    }


    return (<>
        <div className={styles.wrapper}>
            <div className={classNames(styles.title, "font-h1 font-color")}>Войти</div>

            <form
                className={classNames(styles.form, isLoading && styles.formLoading)}
                onSubmit={handleSubmit}
            >
                <ProgressBarLine progress={progress} isLoading={isLoading} />

                <Input
                    name="login"
                    externalMessage={messages.login}

                    placeholder="Логин"
                    onChange={setLogin}

                    className={styles.formItem}
                    required
                />

                <Input
                    name="password"
                    externalMessage={messages.password}

                    type="password"
                    placeholder="Пароль"
                    onChange={setPassword}

                    className={styles.formItem}
                    required
                />

                <button className={classNames(buttonStyles.button, styles.formItem)}>
                    Войти
                </button>
            </form>

            <Link to="/auth/signup" className={styles.link}>У меня нет аккаунта</Link>
        </div>
    </>);
};