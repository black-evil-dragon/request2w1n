import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom"
import classNames from "classnames";


import { ThemeSwitcher } from "@features/theme";

import styles from "./auth-page.module.scss"
import { SignInForm } from "@features/auth/ui/SignInForm";
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
                <Route path="signup" element={<AuthHome />} />
            </Route>


            <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </Routes>
    </>);
}
