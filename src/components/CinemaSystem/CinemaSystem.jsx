import { Badge, Tabs } from 'antd';
// import { Tabs } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCinemaSystemAction } from '../../redux/reducers/CinemaSystemReducer/CinemaSystemActions';
import './CinemaSystem.scss'
import moment from 'moment/moment';
import { SHOWTIME_FORM_RENDER } from '../../util/settings/Config';
import { useNavigate } from 'react-router-dom';
import { Animated } from 'react-animated-css';

function CinemaSystem() {
    const { cinemaSystem } = useSelector(state => state.CinemaSystemReducer);
    const [isVisible, setIsVisible] = useState(false);
    const myRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const action = setCinemaSystemAction();
        dispatch(action);
    }, [])

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

    const renderItems = () => {
        return cinemaSystem?.map((brand, index) => {
            return {
                label: <div className='py-4'>
                    <img className='rounded-full' style={{
                        width: 50,
                        height: 50
                    }} src={brand.logo} alt={brand.maHeThongRap} />
                </div>,
                key: index,
                children: <div div className='border border-r-1 border-gray-600' style={{
                    height: 700,
                    overflowY: 'scroll'
                }}>
                    <Tabs
                        className='h-full'
                        tabPosition={"left"}
                        items={brand.lstCumRap?.map((cinema, index) => {
                            return {
                                label: <div className='py-4 border border-x-0 border-t-0 border-b-1 xl:w-[350px] md:w-[300px]'>
                                    <h1 className='text-left xl:text-lg md:text-sm text-xs font-bold' style={{
                                        color: '#ff0000'
                                    }}>{cinema.tenCumRap}</h1>
                                    <p className='text-left xl:text-sm text-xs text-white'>{cinema?.diaChi?.length > 40 ? (cinema.diaChi.slice(0, 40) + '...') : cinema.diaChi}</p>
                                </div>,
                                key: index,
                                children: <div className='py-4 border border-y-0 border-r-0 border-l-1' style={{
                                    height: 700,
                                    overflowY: 'scroll'
                                }}>
                                    {
                                        cinema.danhSachPhim?.map((film) => {
                                            return <div className='p-2' key={film.maPhim}>
                                                <div className='p-3 border border-x-0 border-t-0 border-y-1 border-gray-600' key={film.maPhim}>
                                                    <div className='grid grid-cols-12'>
                                                        <div className='col-span-2 flex justify-center'>
                                                            <img className='xl:h-[125px] xl:w-[100px] md:h-[100px] md:w-[50px]' style={{
                                                            }} src={film.hinhAnh} alt={film.tenPhim} />
                                                        </div>
                                                        <div className='col-span-10'>
                                                            <div className='flex items-center'>
                                                                <Badge count={"HOT"} color="#ff0000" />
                                                                <h1 className='text-white text-lg ml-2'>{film.tenPhim}</h1>
                                                            </div>
                                                            <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-1 mt-2'>
                                                                {
                                                                    film.lstLichChieuTheoPhim?.slice(0, 6).map(showtime => {
                                                                        return <button className='border border-1 border-gray-500 p-1 text-green-500 text-sm cursor-pointer hover:text-yellow-300 text-center xl:text-sm lg:text-xs' key={showtime.maLichChieu} onClick={() => navigate(`seats/${showtime.maLichChieu}`)}>
                                                                            {moment(showtime.ngayChieuGioChieu).format(SHOWTIME_FORM_RENDER)}
                                                                        </button>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                        })}
                    />
                </div >,
            };
        })
    }

    return (
        <div ref={myRef} id='showtimes' className='lg:block hidden'>
            <Animated className='flex justify-center py-5' animationIn="fadeInUp" isVisible={isVisible} animationInDuration={2000} >
                <Tabs
                    className='border border-1 border-gray-600'
                    tabPosition={"left"}
                    items={renderItems()}
                    style={{
                        width: '80%',
                        color: '#fff',
                        height: 700
                    }}
                />
            </Animated>
        </div>
    )
}

export default CinemaSystem

