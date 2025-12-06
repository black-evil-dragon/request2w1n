import { Map, Placemark, Polyline, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { routesActions, type Point, type Route } from '@entities/routes';
import { RouteAPI } from '@features/route/api';


import stylesLayout from "@styles/modules/layout.module.scss";
import classNames from 'classnames';


export const RouteMap = () => {
    const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY

    const { routeId } = useParams();

    const dispatch = useAppDispatch();
    const routeData = useAppSelector(state => state.routes.activeRoute)

    const [points, setPoints] = useState<Point[] | []>([])
    const [routeLine, setRouteLine] = useState<any>()



    const fetchData = async () => {
        if (routeId) {
            const response = await RouteAPI.get(routeId)
            dispatch(routesActions.setActiveRoute(response.data as Route))
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        if (routeData && routeData.points) {
            setPoints(routeData.points as Point[])
            setRouteLine(routeData.points.map(point => [point.x, point.y]))
        }

    }, [routeData])



    return (
        <div className={classNames(stylesLayout.pageContainer, stylesLayout.wrapper)}>
            <div className={classNames("font-color font-h1")}>
                {routeData?.name}
            </div>
            <YMaps
                query={{
                    apikey: apiKey,
                    lang: 'ru_RU',
                    load: 'package.full'
                }}
                
            >
                <div style={{ width: '100%', height: '400px' }}>
                    <Map
                        width="100%"
                        height="100%"
                        defaultState={{
                            center: [59.191918, 39.878090],
                            zoom: 16
                        }}
                        
                    >
                        {/* Отображаем точки маршрута */}
                        {routeData?.points?.map((point, index) => (
                            <Placemark
                                key={index}
                                geometry={[point.x, point.y]}
                                properties={{
                                    balloonContent: `
                                    <strong>${point.name}</strong><br/>
                                    Точка ${index + 1}<br/>
                                    ${point.distance?.next ? `До следующей: ${point.distance.next}м` : 'Конечная точка'}
                                `
                                }}
                                options={{
                                    preset: index === 0 ? 'islands#greenDotIcon' :
                                        index === points.length - 1 ? 'islands#redDotIcon' :
                                            'islands#blueDotIcon'
                                }}
                            />
                        ))}

                        {/* Отображаем линию маршрута */}
                        <Polyline
                            geometry={routeLine}
                            options={{
                                // balloonCloseButton: false,
                                strokeColor: '#000',
                                strokeWidth: 4,
                                strokeOpacity: 0.5
                            }}
                        />
                    </Map>
                </div>
            </YMaps>
        </div>
    );
};