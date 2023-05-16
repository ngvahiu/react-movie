import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getCinemaBrandListAPI, getCinemaListAPI } from '../../../services/ManageCinemaService';
import { getMovieDetailsAPI } from '../../../services/ManageFilmService';
import moment from 'moment';
import { SHOWTIME_FORM } from '../../../util/settings/Config';
import { createShowtimeAction } from '../../../redux/reducers/TicketManagementReducer/TicketManagementActions';

function AdminShowtime() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailsFilm, setDetailsFilm] = useState({});
  const [state, setState] = useState({
    cinemaBrandList: [],
    cinemaList: []
  });
  const [showtimeValues, setShowtimeValues] = useState({
    maPhim: id,
    ngayChieuGioChieu: '',
    maRap: '',
    giaVe: 0
  });
  const [form] = Form.useForm();

  useEffect(() => {
    async function getCinemaBrandSystem() {
      try {
        const { content: detailsFilm } = await getMovieDetailsAPI(id);
        const { content: cinemaBrandList } = await getCinemaBrandListAPI();

        await setDetailsFilm(detailsFilm);
        setState({
          ...state,
          cinemaBrandList: cinemaBrandList
        })
      } catch (error) {
        console.log(error);
      }
    }

    getCinemaBrandSystem();
  }, []);

  const handleChangeCinemaBrand = async (value) => {
    try {
      const { content } = await getCinemaListAPI(value);

      setState({
        ...state,
        cinemaList: content
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeCinema = (value) => {
    setShowtimeValues({
      ...showtimeValues,
      maRap: value
    })
  }

  const handleChangeShowtimeDate = (date, dateString) => {
    console.log('dateString: ', dateString);
    const showtime = moment(dateString).format(SHOWTIME_FORM);

    setShowtimeValues({
      ...showtimeValues,
      ngayChieuGioChieu: showtime
    })
  }

  const handleChangePrice = (value) => {
    setShowtimeValues({
      ...showtimeValues,
      giaVe: value
    })
  }
  const handleSubmit = () => {
    console.log('showtimeValues: ', showtimeValues);

    dispatch(createShowtimeAction(showtimeValues, form.resetFields));
  }

  return (
    <div className='grid grid-cols-2'>
      <div>
        <h1 className='text-black font-semibold text-4xl mb-5'>ADD SHOWTIME - <span className='text-2xl text-green-500 font-medium'>{detailsFilm?.tenPhim}</span></h1>
        <img src={detailsFilm?.hinhAnh} alt='film' style={{
          width: '50%',
          height: '80%'
        }} />
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item label="Film ID">
          <Input defaultValue={id} disabled />
        </Form.Item>
        <Form.Item name='tenHeThongRap' label="Cinema brand" rules={[
          {
            required: true,
            message: '*Required'
          }
        ]}>
          <Select options={state.cinemaBrandList?.map((brand) => ({
            label: brand.tenHeThongRap,
            value: brand.maHeThongRap
          }))} onChange={handleChangeCinemaBrand} placeholder="Choose cinema brand" />
        </Form.Item>
        <Form.Item name='tenCumRap' label="Cinema" rules={[
          {
            required: true,
            message: '*Required'
          }
        ]}>
          <Select options={state.cinemaList?.map(cinema => ({
            label: cinema.tenCumRap,
            value: cinema.maCumRap
          }))} onChange={handleChangeCinema} placeholder="Choose cinema" />
        </Form.Item>
        <Form.Item name='ngayChieuGioChieu' label="Showtime" rules={[
          {
            required: true,
            message: '*Required'
          }
        ]}>
          <DatePicker showTime onChange={handleChangeShowtimeDate} />
        </Form.Item>
        <Form.Item name='giaVe' label="Ticket price" rules={[
          {
            required: true,
            message: '*Required'
          }
        ]}>
          <InputNumber max={150000} min={75000} onChange={handleChangePrice} />
        </Form.Item>
        <div className='grid grid-cols-5'>
          <button className='col-start-2 col-span-1 py-2 rounded-lg bg-gray-200 text-red-600 border border-1 mr-4' type='button'>Back</button>
          <Button className='h-full bg-orange-700 text-white hover:text-white' htmlType='submit' rounded='lg'>Add</Button>
        </div>
      </Form>
    </div>
  )
}

export default AdminShowtime