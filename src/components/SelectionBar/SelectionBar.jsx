import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import './SelectionBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilmListAction } from '../../redux/reducers/FilmManagementReducer/FilmManagementActions';
import { getShowtimeWithFilmID } from '../../services/ManageCinemaService';
import { SHOWTIME_FORM_RENDER } from '../../util/settings/Config';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function SelectionBar({ idFilm }) {
    const { arrFilm } = useSelector(state => state.FilmManagementReducer);
    const [showtimeInfor, setShowtimeInfor] = useState({});
    const [showtimeList, setShowtimeList] = useState([]);
    const [showtimeSelected, setShowtimeSelected] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function getData() {
            await dispatch(setFilmListAction());

            if (idFilm) {
                await handleChangeFilm(idFilm);
            }
        }

        getData();
    }, [])

    const handleChangeFilm = async (value) => {
        const { content } = await getShowtimeWithFilmID(value);
        setShowtimeInfor(content);
    };

    const handleChangeCinema = (value) => {
        let showtimeArray = null;
        showtimeInfor.heThongRapChieu.forEach(brand => {
            brand.cumRapChieu.forEach(cinema => {
                if (cinema.maCumRap === value) {
                    showtimeArray = cinema.lichChieuPhim;
                }
            })
        })

        if (showtimeArray) {
            setShowtimeList(showtimeArray);
        }
    }

    const handleChangeShowtime = (value) => {
        if (value) {
            setShowtimeSelected(value);
        }
    }

    return (
        <div className='flex justify-center mt-8 w-full'>
            <div className='border border-1 py-4 px-3 rounded-lg grid xl:grid-cols-4 sm:grid-cols-1 gap-2 selection-bar' style={{
                backgroundColor: 'rgb(32, 32, 33)'
            }}>
                {!idFilm ? <div className='xl:col-span-3 grid grid-cols-3 gap-1'>
                    <Select
                        bordered={false}
                        defaultValue={"Film"}
                        style={{
                            background: '#fff',
                            color: '#000'
                        }}
                        onChange={handleChangeFilm}
                        options={arrFilm?.filter(film => (film.dangChieu || film.sapChieu))?.map(film => ({
                            value: film.maPhim,
                            label: film.tenPhim
                        }))}
                        disabled={idFilm}
                    />
                    <Select
                        bordered={false}
                        defaultValue="Cinema"
                        style={{
                            background: '#fff'
                        }}
                        onChange={handleChangeCinema}
                        options={showtimeInfor?.heThongRapChieu?.reduce((result, brand) => {
                            brand?.cumRapChieu.forEach(cinema => {
                                result = [...result, {
                                    value: cinema.maCumRap,
                                    label: cinema.tenCumRap
                                }];
                            })

                            return result;
                        }, [])}
                    />
                    <Select
                        bordered={false}
                        defaultValue="Showtime"
                        style={{
                            background: '#fff'
                        }}
                        onChange={handleChangeShowtime}
                        options={showtimeList?.map(showtime => ({
                            value: showtime.maLichChieu,
                            label: moment(showtime.ngayChieuGioChieu).format(SHOWTIME_FORM_RENDER)
                        }))}
                    />
                </div> : <div className='xl:col-span-3 grid grid-cols-2 gap-1'>
                    <Select
                        bordered={false}
                        defaultValue="Cinema"
                        style={{
                            background: '#fff'
                        }}
                        onChange={handleChangeCinema}
                        options={showtimeInfor?.heThongRapChieu?.reduce((result, brand) => {
                            brand?.cumRapChieu.forEach(cinema => {
                                result = [...result, {
                                    value: cinema.maCumRap,
                                    label: cinema.tenCumRap
                                }];
                            })

                            return result;
                        }, [])}
                    />
                    <Select
                        bordered={false}
                        defaultValue="Showtime"
                        style={{
                            background: '#fff'
                        }}
                        onChange={handleChangeShowtime}
                        options={showtimeList?.map(showtime => ({
                            value: showtime.maLichChieu,
                            label: moment(showtime.ngayChieuGioChieu).format(SHOWTIME_FORM_RENDER)
                        }))}
                    />
                </div>}
                <div className='xl:col-span-1'>
                    <Button className='w-full text-white bg-orange-600 border-orange-600 hover:bg-black hover:border-black transition-all duration-500' style={{ width: '100%' }} onClick={() => {
                        if (showtimeSelected)
                            navigate(`/seats/${showtimeSelected}`);
                    }} disabled={!showtimeSelected}>BUY</Button>
                </div>
            </div>
        </div>
    )
}

export default SelectionBar