import { useEffect, useRef, useState } from "react"
import type { SwiperRef } from "swiper/react"


import { getWindowDimensions } from "@shared/utils/windowDimension"


import type { Slider } from "../types"



// interface UseIntervalSliderProps {
//     sliders: Slider[]
// }



export const useIntervalSlider = (sliders: Slider[]) => {


    const [intervalSliders, setIntervalSlider] = useState<Slider[]>(sliders)
    const [intervalIndex, setIntervalIndex] = useState(0)

    const [slider, setSlider] = useState(sliders[intervalIndex])


    const [intervalStart, setIntervalStart] = useState(slider.interval.start)
    const [intervalEnd, setIntervalEnd] = useState(slider.interval.end)

    const [slides, setSlides] = useState(slider.slides)

    const [sliderInAnim, setSliderInAnim] = useState(false)
    const [sliderTitle, setSliderTitle] = useState(slider.name)

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const sliderRef = useRef<SwiperRef | null>(null)


    const updateIntervalIndex = (value: number) => {
        if (value < 0 && intervalIndex === 0 || value > 0 && intervalIndex + 1 === intervalSliders.length) return

        setIntervalIndex(intervalIndex + value)
    }


    useEffect(() => {
        const start = slider.interval.start
        const end = slider.interval.end

        let prev_start = intervalStart
        let prev_end = intervalEnd

        const delayStart = 50 - 1000 * (Math.abs(1 - prev_start / start))
        const delayEnd = 50 - 1000 * (Math.abs(1 - prev_end / end))


        const intervalIdStart = setInterval(() => {
            if (prev_start === start) return clearInterval(intervalIdStart)

            if (prev_start < start) {
                setIntervalStart(++prev_start)
            }
            if (prev_start > start) {
                setIntervalStart(--prev_start)
            }
        }, delayStart)

        const intervalIdEnd = setInterval(() => {
            if (prev_end === end) return clearInterval(intervalIdEnd)

            if (prev_end < end) {
                setIntervalEnd(++prev_end)
            }
            if (prev_end > end) {
                setIntervalEnd(--prev_end)
            }
        }, delayEnd)

        const timer = setTimeout(() => {
            setSlides(slider.slides)
            setSliderTitle(slider.name)

            sliderRef.current && sliderRef.current.swiper.slideTo(0)

            clearTimeout(timer)
        }, 100)
    }, [intervalIndex])

    useEffect(() => {
        window.addEventListener('resize', () => setWindowDimensions(getWindowDimensions()))

        return () => window.removeEventListener('resize', () => setWindowDimensions(getWindowDimensions()))
    }, [])



    


    return {
        intervalSliders,
        slider,
        windowDimensions,

        sliderTitle,
        sliderRef,
        slides,
        intervalIndex,

        sliderInAnim,

        updateIntervalIndex,
    }
}