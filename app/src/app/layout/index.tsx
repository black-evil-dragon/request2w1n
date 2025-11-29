import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";


// import { Header } from "@app/layout/Header";
import { Footer } from '@app/layout/Footer';
import { ThemeSwitcher } from "@features/theme";


import headerStyles from "@styles/modules/header.module.scss";


export function Layout() {

    return (<>
        {/* App header component */}
        <header className={classNames(headerStyles.wrapper)}>
            <div className={headerStyles.navigation}>
                <Link to={'/'} className={headerStyles.navigationItem}>Главная</Link>
                <Link to={'/route'} className={headerStyles.navigationItem}>Маршруты</Link>
            </div>
            <ThemeSwitcher className={classNames(headerStyles.item, headerStyles.itemRight)} />
        </header>

        {/* App content */}
        <div className="app-content">
            <Outlet />
        </div>

        {/* App footer component */}
        <Footer />
    </>);
}
