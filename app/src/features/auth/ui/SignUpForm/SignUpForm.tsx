import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";

import classNames from "classnames";

import { ProgressBarLine, useProgress } from "@shared/ui/progress";
import { Input, type InputMessageType } from "@shared/ui/components/Input"


import styles from '@styles/modules/form.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";
import { AuthAPI } from "@features/auth/api";


export const SignUpForm = () => {
    // Inputs
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password_again, setPasswordAgain] = useState<string>("")

    // Messages
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});
    const [buttonMessage, setButtonMessage] = useState<string>("");

    // Progress
    const { progress, isLoading, startProgress, completeProgress } = useProgress();


    const navigate = useNavigate()


    const handleChange = (value: string, setValue: Dispatch<SetStateAction<string>>) => {
        if (buttonMessage) {
            setButtonMessage("")
        }

        setValue(value)
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

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


        if (password !== password_again) {
            return setMessages(_ => ({
                password_again: {
                    text: "Пароли не совпадают",
                    type: "danger"
                }
            }))
        }


        startProgress()
        try {
            const response = await AuthAPI.register({ login, password })
            if (!response.success && response.error) {

                if (response.error.fields) {
                    setMessages(response.error.fields)
                    
                }

                return completeProgress()
            }

            completeProgress(async () => {
                navigate('/')
            })
        } catch (error) {
            console.error(error);

        }
    }

    return (<>
        <div className={styles.wrapper}>
            <div className={classNames(styles.title, "font-h1 font-color")}>Зарегистрироваться</div>

            <form
                onSubmit={handleSubmit}
                className={classNames(styles.form, isLoading && styles.formLoading)}
            >
                <ProgressBarLine progress={progress} isLoading={isLoading} />

                <Input
                    name="login"
                    externalMessage={messages.login}

                    placeholder="Логин"
                    onChange={(value) => handleChange(value, setLogin)}

                    className={styles.formItem}
                    required
                />

                <Input
                    name="password"
                    externalMessage={messages.password}

                    type="password"
                    placeholder="Пароль"
                    onChange={(value) => handleChange(value, setPassword)}

                    className={styles.formItem}
                    required
                />

                <Input
                    name="password_again"
                    externalMessage={messages.password_again}

                    type="password"
                    placeholder="Повторите пароль"
                    onChange={(value) => handleChange(value, setPasswordAgain)}

                    className={styles.formItem}
                    required
                />


                <button className={classNames(buttonStyles.button, styles.formItem, styles.formButton)}>
                    {isLoading ? "Записываем..." : "Регистрация"}
                </button>
            </form>

            <Link to="/auth/signin" className={styles.link}>Войти в аккаунт</Link>
        </div>
    </>);
};