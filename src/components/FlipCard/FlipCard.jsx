import React, { useState } from 'react'
import './FlipCard.scss'
import { Badge } from 'antd'
import ModalTrailer from '../ModalTrailer/ModalTrailer'
import { useDispatch } from 'react-redux';
import { SHOW_TRAILER } from '../../redux/reducers/TrailerUrlReducer/TrailerUrlTypes';
import { useNavigate } from 'react-router-dom';

function FlipCard({ tenPhim, maPhim, moTa, trailer, hinhAnh }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <ModalTrailer isModalOpen={isModalOpen} handleSetModalOpen={setModalOpen} />
            <div className="flip-card rounded-lg cursor-pointer w-full h-full">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className='rounded-lg w-full h-full card-img' src={hinhAnh} alt="Avatar" />
                        <div className='flex items-center px-3 py-1'>
                            <Badge count={"HOT"} color="#ff0000" />
                            <h1 className='xl:text-xl md:text-lg text-left pl-3'>{tenPhim}</h1>
                        </div>
                        <p className='pl-3 text-left text-xs'>{moTa?.length > 100 ? (moTa.slice(0, 150) + '...') : moTa}</p>
                    </div>
                    <div className="flip-card-back">
                        <div className='banner-card-back rounded-lg w-full h-full'>
                            <div className='overlay-banner flex flex-col justify-center items-center'>
                                <button className='border border-1 border-white bg-transparent rounded-full flex justify-center items-center transition-all duration-500' style={{
                                    width: 56,
                                    height: 56
                                }} onClick={async () => {
                                    await dispatch({
                                        type: SHOW_TRAILER,
                                        payload: trailer
                                    })
                                    setModalOpen(true);
                                }}>
                                    <i className="fa fa-play"></i>
                                </button>
                                <h1 className='text-white transition-all duration-500'>TRAILER</h1>
                            </div>
                            <img className='rounded-lg' src={hinhAnh} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <button className='w-full py-2 mt-4 transition-all duration-500 rounded-lg' style={{
                            backgroundColor: '#ff0000'
                        }} onClick={() => navigate(`/detail/${maPhim}`)}>BUY TICKET</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlipCard