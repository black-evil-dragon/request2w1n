import { useCallback, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme | null>(localStorage.getItem('theme') as Theme);


    const isTheme = (theme: string): theme is Theme => {
        return theme === 'light' || theme === 'dark';
    }


    
    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = systemIsDark ? 'dark' : 'light'

        if (savedTheme && isTheme(savedTheme)) {

            return savedTheme
        }

        return systemTheme
    }

    // * EXPORT
    const initTheme = useCallback(() => {
        const current_theme: Theme = getTheme()

        localStorage.setItem('theme', current_theme);
        document.documentElement.setAttribute('data-theme', current_theme);
        setTheme(current_theme)
    }, [])


    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const clearTheme = () => {
        const newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        localStorage.removeItem('theme')
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    }

    return { theme, initTheme, toggleTheme, clearTheme };
};