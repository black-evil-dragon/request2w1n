import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";


import { Input, type InputMessageType } from "@shared/ui/components/Input"


import styles from '../styles/form.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";

export const SignUpForm = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});

    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    return (<>
        <div className={styles.wrapper}>
            <div className={classNames(styles.title, "font-h1 font-color")}>Зарегистрироваться</div>

            <div className={classNames(styles.progress, (isLoading) && styles.progressShow)} style={{ backgroundSize: `${progress}% 2px` }}></div>

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

                <Input
                    name="password_again"
                    externalMessage={messages.password_again}

                    type="password"
                    placeholder="Повторите пароль"
                    onChange={setPassword}

                    className={styles.formItem}
                    required
                />


                <div className={classNames(buttonStyles.button, styles.formItem)} onClick={() => {}}>
                    Войти
                </div>
            </div>

            <Link to="/auth/signup" className={styles.link}>У меня нет аккаунта</Link>
        </div>
    </>);
};