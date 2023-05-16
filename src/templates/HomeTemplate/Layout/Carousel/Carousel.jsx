import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.scss";

// import required modules
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { setBannerCarouselAction } from "../../../../redux/reducers/CarouselReducer/CarouselActions";
import ButtonMovie from "../../../../components/ButtonMovie/ButtonMovie";
import ModalTrailer from "../../../../components/ModalTrailer/ModalTrailer";
import { SHOW_TRAILER } from "../../../../redux/reducers/TrailerUrlReducer/TrailerUrlTypes";


function Carousel() {
    const { arrBannerFilm } = useSelector(state => state.CarouselReducer);
    // const [trailerURL, setTrailerURL] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = setBannerCarouselAction();
        dispatch(action);
    }, [])

    const renderBanner = () => {
        return arrBannerFilm.map((banner) => {
            return <SwiperSlide key={banner.maBanner} style={{
                width: 500,
                height: 500
            }}>
                <div className="swiper-item" style={{
                    backgroundImage: `url(${banner.hinhAnh})`,
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%"
                }}>
                    <div className="swiper-item-overlay flex flex-col justify-end">
                        <div className="pb-5 px-5">
                            <h1 className="text-4xl text-white font-extrabold mb-4 banner-title">{banner.tenPhim}</h1>
                            <p className="text-lg text-white my-4 banner-description">{banner.moTa}</p>
                            <ButtonMovie type={'button'} rounded={'none'} px={8} py={2}>
                                <div onClick={async () => {
                                    await dispatch({
                                        type: SHOW_TRAILER,
                                        payload: banner.trailer
                                    })
                                    setModalOpen(true);
                                }}>
                                    <i className="fa fa-play mr-2"></i>Play Now
                                </div>
                            </ButtonMovie>
                            <ButtonMovie type={'button'} rounded={'none'} px={8} py={2}>
                                <i className="fa fa-plus mr-2"></i>My List
                            </ButtonMovie>
                        </div>
                    </div>
                </div>
            </SwiperSlide >
        })
    }

    return (
        <>
            <ModalTrailer isModalOpen={isModalOpen} handleSetModalOpen={setModalOpen} />
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
            >
                {renderBanner()}
            </Swiper>
        </>
    );
}

export default Carousel;
