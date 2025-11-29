import { Link } from 'react-router-dom';

import classNames from 'classnames';

import styles from './home-page.module.scss'


export const HomePage = () => {
    return (<>
        <div className={classNames(styles.wrapper)}>
            <div className={styles.links}>
                <Link to={'/route'} className={styles.linksItem}>Работа с маршрутами</Link>
                <Link to={'/auth'} className={styles.linksItem}>Авторизации</Link>
            </div>
        </div>
    </>);
};