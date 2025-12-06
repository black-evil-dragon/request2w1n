
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { routesActions, type Route } from "@entities/routes";
import { RouteAPI } from "@features/route/api";
import classNames from "classnames";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import stylesLayout from "@styles/modules/layout.module.scss";



export const RouteDetails = () => {
    const { routeId } = useParams();
    const dispatch = useAppDispatch();
    const routeData = useAppSelector(state => state.routes.activeRoute)

    const fetchData = async () => {
        if (routeId) {
            const response = await RouteAPI.get(routeId)
            dispatch(routesActions.setActiveRoute(response.data as Route))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (<>
        <div className={classNames(stylesLayout.pageContainer)}>
            {routeData && <>
                <div className="font-color font-h1">{routeData.name}</div>

                {routeData.points && routeData.points.map((point, index) => (
                    <div key={index}>
                        {point.name}
                    </div>
                ))}
            </>}
        </div>
    </>);
};

{/* <IntervalSlider sliders={[{
    sort: 0,
    name: "Памятник",
    interval: {
        start: 103,
        end: 145,
    },
    slides: [{
        name: "s",
        description: "stq"
    }]
},
{
    sort: 1,
    name: "Дом",
    interval: {
        start: 145,
        end: 294,
    },
    slides: [{
        name: "s",
        description: "stq"
    }]
}]} /> */}