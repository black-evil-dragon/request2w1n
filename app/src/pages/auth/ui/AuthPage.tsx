import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom"
import classNames from "classnames";

import { SignInForm, SignUpForm } from "@features/auth";
import { ThemeSwitcher } from "@features/theme";

import styles from "./auth-page.module.scss"

import buttonStyles from "@styles/modules/button.module.scss";

const AuthLayout = () => {
    return (<>
        <header className={classNames(styles.header)}>
            <ThemeSwitcher />
        </header>

        

        <div className={classNames(styles.wrapper)}>
            <Outlet />
        </div>
    </>)
}

const AuthHome = () => {
    return (<>
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.title, "font-h1", "font-color")}>Re.qu$t2W1n</div>

            <div className={classNames(styles.links)}>
                <Link to="/auth/signin" className={classNames(styles.linksItem, buttonStyles.button)}>Войти</Link>
                <Link to="/auth/signup" className={styles.linksItem}>Зарегистрироваться</Link>
            </div>
        </div>
    </>)
}

export const AuthRouting = () => {
    return (<>
        <Routes>
            <Route path="" element={<AuthLayout />}>
                <Route path="" element={<AuthHome />} />
                <Route path="signin" element={<SignInForm />} />
                <Route path="signup" element={<SignUpForm />} />
            </Route>


            <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </Routes>
    </>);
}
