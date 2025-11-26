import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";


import { Input, type InputMessageType } from "@shared/ui/components/Input"
import { ProgressBarLine, useProgress } from "@shared/ui/progress";

import styles from '../styles/form.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";



export const SignInForm = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});

    const {progress, isLoading, startProgress} = useProgress()



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

        startProgress()
    }


    return (<>
        <div className={styles.wrapper}>
            <div className={classNames(styles.title, "font-h1 font-color")}>Войти</div>

            <ProgressBarLine progress={progress} isLoading={isLoading} />
            
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