
import classNames from "classnames";
import { Link, Route, Routes } from "react-router-dom";


import { RouteDetails } from "@features/route/route-details";
import { FindRouteForm } from "@features/route/find-route";
import { RoutesList } from "@features/route/routes-list";


import stylesLayout from "@styles/modules/layout.module.scss";


const RoutePage = () => {
    return (<>
        <div className={classNames(stylesLayout.pageContainer)}>
            <div className={classNames(stylesLayout.wrapper)}>
                <div>
                    <Link to="/route/find">Найти маршрут</Link>
                </div>
                <div>
                    <Link to="/route/list">Список маршрутов</Link>
                </div>
            </div>
        </div>
    </>);
};

export const RouteRouting = () => {
    return (<>
        <Routes>
            <Route index element={<RoutePage />} />
            <Route path="/find" element={<FindRouteForm />} />
            <Route path="/list" element={<RoutesList />} />

            <Route path="/:routeId/" element={<RouteDetails />}/>
            <Route path="/:routeId/map" element={<RouteDetails />} />
            <Route path="/:routeId/plan" element={<RouteDetails />} />

            {/* <Route path="*" element={<Navigate to={"/404"} replace />} /> */}
        </Routes>
    </>);
}