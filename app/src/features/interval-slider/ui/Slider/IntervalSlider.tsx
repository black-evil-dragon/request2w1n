// import Swiper from "swiper";
import type { FC } from "react";


import {  useIntervalSlider } from "@features/interval-slider";
import type { Slider } from "@features/interval-slider";
// import Arrow from "@shared/images/arrow.svg";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


import './interval-slider.scss'


interface IntervalSliderProps {
    sliders: Slider[]
}

export const IntervalSlider: FC<IntervalSliderProps> = ({sliders}) => {
    const {
        // slider,
        intervalSliders,
        slides,
        sliderTitle,
        sliderRef,
        windowDimensions,
        intervalIndex,
        sliderInAnim,
        updateIntervalIndex

    } = useIntervalSlider(sliders)

    const Slider = () => (
        <div className={`interval-slider_slider ${sliderInAnim ? '--hide' : ''}`}>
            {windowDimensions.width <= 768 && <div className={`interval-slider_slider--title`}>{sliderTitle}</div>}
            <div className="interval-slider_slider__container">
                <Swiper
                    ref={sliderRef}
                    slidesPerView={3}
                    spaceBetween={80}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}

                    grabCursor={windowDimensions.width <= 768 ? false : true}
                    freeMode={windowDimensions.width <= 768 ? true : false}


                    navigation={{
                        prevEl: '.interval-slider_slider__arrow.--prev',
                        nextEl: '.interval-slider_slider__arrow.--next',
                    }}

                    pagination={{
                        el: '.interval-slider_pagination',
                        type: 'bullets',
                        clickable: true,
                    }}

                    modules={[Navigation, Pagination]}
                >
                    {
                        slides.map((slide, index) => (
                            <SwiperSlide className='interval-slider_slider__slide' key={`in-sl-${index}`}>
                                <div className="interval-slider_slider__slide--title">{slide.name}</div>
                                <div className="interval-slider_slider__slide--text">{slide.description}</div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className="interval-slider_slider__arrow --prev">
                    {/* <Arrow /> */}
                    {"<"}
                </div>
                <div className="interval-slider_slider__arrow --next">
                    {">"}
                </div>
            </div>
        </div>
    )

    return (<>
        <div className="interval-slider">
            <div className="interval-slider__content">
                <div className="interval-slider__title">
                    <div className="interval-slider__title--text">
                        План<br />маршрута
                    </div>
                </div>

                <div className="interval-slider_wrapper">
                    {/* <Track
                        sliders={intervalSliders}
                        setIntervalIndex={setIntervalIndex}
                        intervalIndex={intervalIndex}
                        setSliderInAnim={setSliderInAnim}

                        intervalStart={intervalStart}
                        intervalEnd={intervalEnd}
                    /> */}

                    {windowDimensions.width <= 768 && <Slider />}
                </div>



                <div className="interval-slider_navigation">
                    <div className="interval-slider_navigation__wrapper">
                        <div className="interval-slider_navigation__progress">{("0" + (intervalIndex + 1)).slice(-2)}/{("0" + intervalSliders.length)}</div>
                        <div className="interval-slider_navigation__controls">
                            <div
                                className={
                                    `interval-slider_navigation__controls--arrow --prev ${intervalIndex === 0 ? '--disable' : ''}`
                                }
                                onClick={() => updateIntervalIndex(-1)}>
                                {"<"}
                            </div>
                            <div className={`interval-slider_navigation__controls--arrow --next ${intervalIndex === intervalSliders.length - 1 ? '--disable' : ''}`} onClick={() => updateIntervalIndex(1)}>
                                {">"}
                            </div>
                        </div>
                    </div>
                    <div className="interval-slider_pagination">

                    </div>
                </div>

                {/* {windowDimensions.width > 768 && slider} */}
            </div>
        </div>
    </>);
};