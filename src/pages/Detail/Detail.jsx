import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setFilmSelectedAction } from '../../redux/reducers/CinemaSystemReducer/CinemaSystemActions';
import moment from 'moment';
import { DATE_FORM, SHOWTIME_FORM_RENDER } from '../../util/settings/Config';
import { Tabs } from 'antd';
import ModalTrailer from '../../components/ModalTrailer/ModalTrailer';
import { SHOW_TRAILER } from '../../redux/reducers/TrailerUrlReducer/TrailerUrlTypes';
import { RESET_CHOOSING_SEATS } from '../../redux/reducers/TicketManagementReducer/TicketManagementTypes';
import './Detail.scss'
import SelectionBar from '../../components/SelectionBar/SelectionBar';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { filmSelected } = useSelector(state => state.CinemaSystemReducer);
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = setFilmSelectedAction(id);

        dispatch(action);
    }, [])

    const renderItems = () => {
        return filmSelected?.heThongRapChieu?.map((brand, index) => {
            return {
                label: <div className='py-4'>
                    <img className='rounded-full' style={{
                        width: 50,
                        height: 50
                    }} src={brand.logo} alt={brand.maHeThongRap} />
                </div>,
                key: index,
                children: <div div className='border border-r-1 border-gray-200' style={{
                    height: 500,
                    overflowY: 'scroll'
                }}>
                    <Tabs
                        className='h-full'
                        tabPosition={"left"}
                        items={brand.cumRapChieu?.map((cinema, index) => {
                            return {
                                label: <div className='py-4 border border-x-0 border-t-0 border-b-1 grid grid-cols-4 xl:w-[350px] lg:w-[300px]'>
                                    <div className='col-span-1 flex justify-center'>
                                        <img src={cinema.hinhAnh} alt={cinema.tenCumRap} style={{
                                            width: 50,
                                            height: 50
                                        }} />
                                    </div>
                                    <div className='col-span-3'>
                                        <h1 className='text-left xl:text-lg lg:text-sm font-bold' style={{
                                            color: '#ff0000'
                                        }}>{cinema.tenCumRap}</h1>
                                        <p className='w-full text-left text-xs text-black'>{cinema?.diaChi?.length > 40 ? (cinema.diaChi.slice(0, 40) + '...') : cinema.diaChi}</p>
                                    </div>
                                </div>,
                                key: index,
                                children: <div className='border border-y-0 border-r-0 border-l-1 border-gray-200' style={{
                                    height: 500,
                                    overflowY: 'scroll'
                                }}>
                                    {
                                        cinema.lichChieuPhim?.map((showtime) => {
                                            return <div className=''>
                                                <div className='p-2 border border-x-0 border-t-0 border-y-1 border-gray-200' key={showtime.maLichChieu}>
                                                    <div className='flex flex-col'>
                                                        <h1 className='xl:text-lg lg:text-base ml-2 font-bold mb-3'>{showtime.tenRap}</h1>
                                                        <div className='grid xl:grid-cols-3 lg:grid-cols-2'>
                                                            <button className='border border-1 border-gray-200 p-1 text-green-500 xl:text-sm lg:text-xs cursor-pointer hover:text-yellow-300 text-center' onClick={async () => {
                                                                //reset choosingSeats first
                                                                dispatch({
                                                                    type: RESET_CHOOSING_SEATS
                                                                })
                                                                //move to page seats
                                                                navigate(`/seats/${showtime.maLichChieu}`)
                                                            }}>
                                                                {moment(showtime.ngayChieuGioChieu).format(SHOWTIME_FORM_RENDER)}
                                                            </button>
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
        <>
            <ModalTrailer isModalOpen={isModalOpen} handleSetModalOpen={setModalOpen} />
            <div style={{
                backgroundImage: `url(${require("../../assets/background-1.jpg")})`,
                backgroundPosition: 'center',
                backgroundSize: '100% 100%'
            }}>
                <div className='container mx-auto'>
                    <div className='pt-10 pb-28 grid lg:grid-cols-3 grid-cols-1 pt-16'>
                        <div className='general grid grid-cols-2 lg:col-span-2 col-span-1'>
                            <div className='flex justify-end'>
                                <img className='border border-1' src={filmSelected?.hinhAnh} alt={filmSelected?.tenPhim} style={{
                                    width: '80%',
                                    height: '80%'
                                }} />
                            </div>
                            <div className='flex flex-col justify-between ml-4' style={{
                                height: '80%'
                            }}>
                                <div className='flex flex-col justify-start'>
                                    <h1 className='text-white md:text-4xl text-xl font-bold'>{filmSelected?.tenPhim}</h1>
                                    <span className='text-yellow-500 md:text-base text-sm md:my-3 my-0'>{moment(filmSelected.ngayKhoiChieu).format(DATE_FORM)}</span>
                                    <p className='text-white md:text-base text-xs'>{filmSelected?.moTa?.length > 400 ? filmSelected.moTa.slice(0, 300) + ' ...' : filmSelected.moTa}</p>
                                </div>
                                <button className='bg-green-400 py-2 hover:bg-green-600 transition-all duration-500 text-white md:text-base text-xs' style={{
                                    width: '40%'
                                }} onClick={async () => {
                                    await dispatch({
                                        type: SHOW_TRAILER,
                                        payload: filmSelected?.trailer
                                    })
                                    setModalOpen(true);
                                }}>TRAILER</button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start items-center col-span-1 md:mt-0 mt-3'>
                            <h1 className='text-2xl text-white mb-5'>Rating</h1>
                            <div className='w-full flex flex-col items-center'>
                                {/* <CircularProgressbar value={66} minValue={0} maxValue={100} text={`${66}%`} /> */}
                                <div className='sm:w-[200px] w-[190px]'>
                                    <CircularProgressbarWithChildren
                                        value={filmSelected.danhGia * 10}
                                        text={`${filmSelected.danhGia * 10}%`}
                                        strokeWidth={10}
                                        styles={buildStyles({
                                            strokeLinecap: "butt",
                                            textColor: 'white',
                                            pathColor: '#ff0000'
                                        })}
                                    >
                                        <RadialSeparators
                                            count={12}
                                            style={{
                                                background: "#fff",
                                                width: "2px",
                                                // This needs to be equal to props.strokeWidth
                                                height: "10%"
                                            }}
                                        />
                                    </CircularProgressbarWithChildren>
                                </div>
                                <div className='flex justify-center'>
                                    {filmSelected && <Bar value={filmSelected?.danhGia / 10 * 5} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:flex hidden justify-center py-5'>
                    {filmSelected?.heThongRapChieu?.length ? <Tabs
                        className='border border-1 bg-white'
                        tabPosition={"left"}
                        items={renderItems()}
                        style={{
                            width: '80%',
                            color: '#fff',
                            height: 500
                        }}
                    /> : <h1 className='text-white text-2xl'>There is no showtime currently.</h1>}
                </div>
                <div className='lg:hidden flex justify-center pb-4 w-full'>
                    <SelectionBar idFilm={id} />
                </div>
            </div>
        </>
    )
}

export default Detail;

function Separator(props) {
    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                transform: `rotate(${props.turns}turn)`
            }}
        >
            <div style={props.style} />
        </div>
    );
}

function RadialSeparators(props) {
    const turns = 1 / props.count;
    return _.range(props.count).map(index => (
        <Separator turns={index * turns} style={props.style} key={index} />
    ));
}

function Bar({ value }) {
    return (
        <StarRatings
            rating={value ? value : 0}
            starDimension="20px"
            starSpacing="5px"
            starRatedColor='yellow'
        />
    );
}