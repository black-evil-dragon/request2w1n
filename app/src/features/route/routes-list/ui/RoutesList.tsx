import classNames from "classnames";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { ProgressBarLine, useProgress } from "@shared/ui/progress";


import { isEmpty } from "@shared/utils/object-empty";
import { RouteAPI } from "@features/route/api";
import { routesActions, type Route } from "@entities/routes";


import styles from "./routes-list.module.scss"
import stylesLayout from "@styles/modules/layout.module.scss";



export const RoutesList = () => {
    const dispatch = useAppDispatch();
    const routes = useAppSelector(state => state.routes);

    const { progress, isLoading, startProgress, completeProgress } = useProgress()


    const fetchRoutes = async () => {
        startProgress()

        completeProgress(async () => {
            const response = await RouteAPI.filter(["DSE425", "AAA777"])
            if (response.success) {
                dispatch(routesActions.setRoutes(response.data as Route[]))
                return
            }
        }, 10)
    }

    useEffect(() => {
        fetchRoutes()
    }, [])


    return (<>
        <div className={classNames(styles.loader, isLoading && styles.loaderShow)}>
            <ProgressBarLine isLoading={isLoading} progress={progress} className={styles.loaderProgressBar} />
        </div>
        {!isLoading && <div className={styles.wrapper}>
            <div className={classNames(stylesLayout.pageContainer, styles.routes)}>
                {isEmpty(routes.ids) ? <div className={classNames(stylesLayout.wrapper)}>
                    <div className={classNames()}>
                        Маршруты не найдены, попробуйте их добавить через <Link to="/route/find" className="font-color">поиск</Link>
                    </div>
                </div> : routes.list.map(

                    (route) => <div className={classNames(stylesLayout.wrapper, styles.routesItem)} key={`rt-${route.id}`}>

                        <div className={classNames(styles.routesItemContent)}>
                            <div className={classNames("font-color font-h4")}>
                                {route.name}
                            </div>

                            <div className={classNames()}>
                                <div className={classNames("font-small")}>Маршрут №{route.id}</div>
                                <div className={classNames("font-small")}>Количество объектов {route.points?.length}</div>
                            </div>
                        </div>

                        <div className={classNames(styles.routesItemActions)}>
                            <div className={classNames(styles.routeItemActionsLink)}>
                                <Link to={`/route/${route.id}/map`} className="">Карта</Link>
                            </div>
                            <div className={classNames(styles.routeItemActionsLink)}>
                                <Link to={`/route/${route.id}/plan`} className="">План</Link>
                            </div>
                            
                        </div>

                    </div>
                )}
            </div>
        </div>}
    </>);
};