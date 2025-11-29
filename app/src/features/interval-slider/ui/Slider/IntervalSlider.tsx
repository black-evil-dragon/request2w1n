// import Swiper from "swiper";
import type { FC } from "react";


import { useIntervalSlider } from "@features/interval-slider";
import type { Slider } from "@features/interval-slider";



export const IntervalSlider: FC<Slider> = ({sliders}) => {
    const { } = useIntervalSlider(sliders)

    // const Slider = () => (
    //     <div className={`interval-slider_slider ${sliderInAnim ? '--hide' : ''}`}>
    //         {windowDimensions.width <= 768 && <div className={`interval-slider_slider--title`}>{sliderTitle}</div>}
    //         <div className="interval-slider_slider__container">
    //             <Swiper
    //                 ref={sliderRef}
    //                 slidesPerView={3}
    //                 spaceBetween={80}
    //                 breakpoints={{
    //                     0: {
    //                         slidesPerView: 2,
    //                         spaceBetween: 20,
    //                     },
    //                     768: {
    //                         slidesPerView: 3,
    //                     },
    //                 }}

    //                 grabCursor={windowDimensions.width <= 768 ? false : true}
    //                 freeMode={windowDimensions.width <= 768 ? true : false}


    //                 navigation={{
    //                     prevEl: '.interval-slider_slider__arrow.--prev',
    //                     nextEl: '.interval-slider_slider__arrow.--next',
    //                 }}

    //                 pagination={{
    //                     el: '.interval-slider_pagination',
    //                     type: 'bullets',
    //                     clickable: true,
    //                 }}

    //                 modules={[Navigation, Pagination]}
    //             >
    //                 {
    //                     slides.map((slide, index) => (
    //                         <SwiperSlide className='interval-slider_slider__slide' key={`in-sl-${index}`}>
    //                             <div className="interval-slider_slider__slide--title">{slide.name}</div>
    //                             <div className="interval-slider_slider__slide--text">{slide.description}</div>
    //                         </SwiperSlide>
    //                     ))
    //                 }
    //             </Swiper>
    //             <div className="interval-slider_slider__arrow --prev">
    //                 <Arrow />
    //             </div>
    //             <div className="interval-slider_slider__arrow --next">
    //                 <Arrow />
    //             </div>
    //         </div>
    //     </div>
    // )

    return (<>

    </>);
};