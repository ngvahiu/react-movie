import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css';
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useDispatch, useSelector } from 'react-redux';
import { setFilmListAction } from '../../redux/reducers/FilmManagementReducer/FilmManagementActions';
import FlipCard from '../FlipCard/FlipCard';
import './FilmList.scss'

import { Animated } from 'react-animated-css';

function FilmList() {
    const [isShowing, setShowing] = useState(true);
    const { arrFilm } = useSelector(state => state.FilmManagementReducer);
    const [isVisible, setIsVisible] = useState(false);
    const myRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = setFilmListAction();

        dispatch(action);
    }, []);

    // set animation
    const handleScroll = () => {
        if (myRef.current && !hasAnimated) {
            const top = myRef.current.getBoundingClientRect().top;
            if (top + 100 <= window.innerHeight) {
                setIsVisible(true);
                setHasAnimated(true);
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        //remove eventListener when the animation occurs first time.
        if (hasAnimated) {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [hasAnimated]);

    const renderFilms = () => {
        if (isShowing) {
            return arrFilm.filter(film => film.dangChieu).map(film => {
                return <SwiperSlide>
                    <FlipCard tenPhim={film.tenPhim} maPhim={film.maPhim} moTa={film.moTa} trailer={film.trailer} hinhAnh={film.hinhAnh} key={film.tenPhim} />
                </SwiperSlide>
            })
        } else {
            return arrFilm.filter(film => film.sapChieu).map(film => {
                return <SwiperSlide>
                    <FlipCard tenPhim={film.tenPhim} maPhim={film.maPhim} moTa={film.moTa} trailer={film.trailer} hinhAnh={film.hinhAnh} key={film.tenPhim} />
                </SwiperSlide>
            })
        }
    }
    return (
        <div ref={myRef}>
            <Animated animationIn="fadeInLeft" isVisible={isVisible} animationInDuration={2000} >
                <div id='filmList' className='my-5'>
                    <div className='flex justify-center my-3'>
                        <button className='text-white mr-3 px-8 py-2 rounded-lg showing-btn' style={isShowing ? {
                            backgroundColor: '#ff0000'
                        } : {
                            borderColor: '#ff0000',
                            borderWidth: '1px'
                        }} onClick={() => setShowing(true)}>SHOWING</button>
                        <button className='text-white px-8 py-2 rounded-lg comingSoon-btn' style={!isShowing ? {
                            backgroundColor: '#ff0000'
                        } : {
                            borderColor: '#ff0000',
                            borderWidth: '1px'
                        }} onClick={() => setShowing(false)}>COMING SOON</button>
                    </div>
                    <Swiper
                        breakpoints={{
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 60
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40
                            },
                            // when window width is >= 320px
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper filmList"
                        style={{
                            backgroundColor: 'transparent',
                            padding: '0 !important',
                            width: '80%',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {renderFilms()}
                    </Swiper>
                </div>
            </Animated >
        </div >
    )
}

export default FilmList