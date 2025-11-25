import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";


import { Input, type InputMessageType } from "@shared/ui/components/Input"


import styles from './sign-in.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";


export const SignInForm = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});

    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    const startProgress = () => {
        setProgress(-25)

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    const timeout = setTimeout(() => {
                        setLoading(false)

                        clearTimeout(timeout)
                    }, 300)
                    return 100;
                }
                return prev + .5;
            });
        }, 1);


    }

    const handleSubmit = () => {
        if (!login || !password) {
            const inputMessages: { [input: string]: InputMessageType } = {
                login: null,
                password: null
            }
            if (!login) {
                inputMessages.login = {
                    text: "Введите логин",
                    type: "danger"
                }

            }
            if (!password) {
                inputMessages.password = {
                    text: "Введите пароль",
                    type: "danger"
                }
            }

            setMessages(inputMessages)
            return
        }

        setLoading(true)
        startProgress()
    }


    return (<>
        <div className={styles.wrapper}>
            <div className={classNames(styles.title, "font-h1 font-color")}>Войти</div>
            
            <div className={classNames(styles.progress, (isLoading) && styles.progressShow)} style={{backgroundSize: `${progress}% 2px`}}></div>
            
            <div className={classNames(styles.form, isLoading && styles.formLoading)}>
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

                <div className={classNames(buttonStyles.button, styles.formItem)} onClick={handleSubmit}>
                    Войти
                </div>
            </div>

            <Link to="/auth/signup" className={styles.link}>У меня нет аккаунта</Link>
        </div>
    </>);
};