import React from 'react';

import { gsap } from 'gsap';




import { getWindowDimensions } from '@shared/model';


import { TrackPoint } from './TrackPoint';
import type { Slider } from '@features/interval-slider/types';



const calculateAngle = (count: number): number => {
    const angleBetweenElements = 180 / count

    return angleBetweenElements + (count > 2 ? 0 : 45)
}

interface SpinnerProps {
    intervalStart: number,
    intervalEnd: number,

    sliders: Slider[],
    intervalIndex: number,

    setIntervalIndex: (arg1: number) => void
    setSliderInAnim: (arg1: boolean) => void
}

export const Track: React.FunctionComponent<SpinnerProps> = ({
    intervalStart,
    intervalEnd,

    sliders,
    intervalIndex,

    setIntervalIndex,
    setSliderInAnim,
}) => {

    const [activePoint, setActivePoint] = React.useState(1)
    const [pointAngle, setPointAngle] = React.useState(calculateAngle(sliders.length))



    const changeActivePoint = (pointNumber: number) => {
        if (pointNumber === activePoint) return;

        setActivePoint(pointNumber);
        setIntervalIndex(pointNumber - 1)
        rotate(pointNumber);
    };

    const rotate = (pointNumber: number) => {
        const targetAngle = (360 / sliders.length) * (pointNumber - 1);
        const currentAngle = pointAngle;

        const angleDifference = ((targetAngle - currentAngle + 540) % 360) - 180;
        const finalAngle = currentAngle + angleDifference + calculateAngle(sliders.length)

        const distance = Math.abs(angleDifference)

        const duration = getWindowDimensions().width > 768 ? (
            Math.max(1000, Math.min(1000, distance * 7.5))
        ) : (
            500
        )

        gsap.to({ angle: pointAngle }, {
            angle: finalAngle,
            duration: duration / 1000,
            onUpdate: function () {
                setPointAngle(this.targets()[0].angle)
            },
            ease: "power1.out",
        });

        setSliderInAnim(true)
        const timer = setTimeout(() => {
            setSliderInAnim(false)

            clearTimeout(timer)
        }, duration)
    };


    React.useEffect(() => {
        if (intervalIndex + 1 !== activePoint) {
            changeActivePoint(intervalIndex + 1)
        }
    }, [intervalIndex])


    return (<>
        <div className="interval-slider_spinner">
            <div className="interval-slider_spinner__interval">
                <span className="interval-slider_spinner__interval--start">{intervalStart}</span>
                &nbsp;&nbsp;
                <span className="interval-slider_spinner__interval--end">{intervalEnd}</span>
            </div>

            <div className="interval-slider_spinner__container">
                {
                    sliders && sliders.map((slider, index) => (
                        <TrackPoint
                            key={`in-pnt-${index}`}

                            isActive={index + 1 === activePoint ? true : false}

                            pointsCount={sliders.length}
                            pointTitle={slider.name}
                            pointNumber={index + 1}

                            pointAngle={pointAngle}

                            handleClick={changeActivePoint}

                        />
                    ))
                }
            </div>
        </div>
    </>);
}