import classNames from "classnames";
import { useEffect, type FC } from "react";

import { DayIcon, NightIcon } from "@shared/icons";

import { useTheme } from "../model/useTheme";


import styles from "./theme-switcher.module.scss";


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme, initTheme } = useTheme();

    
    useEffect(() => {
        initTheme()

    }, [initTheme])


    return (
        <div className={classNames(styles.wrapper, className && className)}>
            <div className={classNames(styles.button, theme == 'light' && styles.buttonActive)} onClick={toggleTheme}>
                <DayIcon />
            </div>
            <div className={classNames(styles.button, theme == 'dark' && styles.buttonActive)} onClick={toggleTheme}>
                <NightIcon />
            </div>
        </div>
    );
}