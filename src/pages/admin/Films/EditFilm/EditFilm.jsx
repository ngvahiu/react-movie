import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  Upload,
} from 'antd';
import '../Films.scss'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getDetailsFilmAction, updateFilmAction } from '../../../../redux/reducers/FilmManagementReducer/FilmManagementActions';
import { useDispatch, useSelector } from 'react-redux';
import { DATE_FORM, GROUP_ID } from '../../../../util/settings/Config';
import moment from 'moment';

const EditFilm = (props) => {
  const { id } = useParams();
  const { detailsFilm } = useSelector(state => state.FilmManagementReducer);
  const [filmValues, setFilmValues] = useState({
    maPhim: '',
    tenPhim: '',
    trailer: '',
    moTa: '',
    biDanh: '',
    ngayKhoiChieu: '',
    dangChieu: true,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
    maNhom: GROUP_ID
  });
  const [imgSrc, setImgSrc] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getDetailsFilmAction(id));
  }, []);

  useEffect(() => {
    async function synchronous() {
      await setFilmValues({
        ...filmValues,
        maPhim: detailsFilm.maPhim,
        tenPhim: detailsFilm.tenPhim,
        trailer: detailsFilm.trailer,
        moTa: detailsFilm.moTa,
        ngayKhoiChieu: moment(detailsFilm.ngayKhoiChieu).format(DATE_FORM),
        dangChieu: detailsFilm.dangChieu,
        sapChieu: detailsFilm.sapChieu,
        hot: detailsFilm.hot,
        danhGia: detailsFilm.danhGia
      });

      await setImgSrc(detailsFilm.hinhAnh);

      form.setFieldsValue({
        tenPhim: detailsFilm.tenPhim,
        trailer: detailsFilm.trailer,
        moTa: detailsFilm.moTa,
        danhGia: detailsFilm.danhGia,
        biDanh: detailsFilm.biDanh,
        dangChieu: detailsFilm.dangChieu,
        sapChieu: detailsFilm.sapChieu,
        hot: detailsFilm.hot,
        ngayKhoiChieu: moment(detailsFilm.ngayKhoiChieu)
      })
    }

    synchronous();
  }, [detailsFilm])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilmValues({ ...filmValues, [name]: value });
  }

  const handleChangeShowingDate = (date, dateString) => {
    const showingDate = moment(dateString).format(DATE_FORM);

    setFilmValues({ ...filmValues, ngayKhoiChieu: showingDate });
  }

  const handleChangeRating = (value) => {
    setFilmValues({ ...filmValues, danhGia: value })
  }

  const handleChangeSwitchDangChieu = (value) => {
    if (value !== filmValues.dangChieu) {
      setFilmValues({ ...filmValues, dangChieu: value, sapChieu: !value });
    }
  }

  const handleChangeSwitchSapChieu = (value) => {
    if (value !== filmValues.sapChieu) {
      setFilmValues({ ...filmValues, dangChieu: !value, sapChieu: value });
    }
  }

  const handleChangeSwitchHot = (value) => {
    if (value !== filmValues.hot) {
      setFilmValues({ ...filmValues, hot: value });
    }
  }

  const handleChangeImage = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgSrc(event.target.result); //e.target.result -> hình base 64
    }

    setFilmValues({ ...filmValues, hinhAnh: file });
  }

  const handleSubmit = () => {
    console.log('filmValues: ', filmValues);

    dispatch(updateFilmAction(filmValues, form.resetFields));
  }

  return (
    <div className='grid grid-cols-2'>
      <div>
        <h1 className='text-black font-semibold text-4xl mb-5'>Edit film - <span className='text-2xl text-green-500 font-medium'>{detailsFilm?.tenPhim}</span></h1>
        <img src={detailsFilm.hinhAnh} alt='film' style={{
          width: '50%',
          height: '50%'
        }} />
      </div>
      <div>
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
          <Form.Item name="maPhim" label="Film ID">
            <Input name='maPhim' defaultValue={id} disabled />
          </Form.Item>
          <Form.Item name="tenPhim" label="Film name" valuePropName='value' rules={[
            {
              required: true,
              message: '*Required'
            }
          ]}
            hasFeedback
          >
            <Input name='tenPhim' onChange={handleChange} />
          </Form.Item>
          <Form.Item name="ngayKhoiChieu" label="Showing date" rules={[
            {
              required: true,
              message: '*Required'
            }
          ]}
            hasFeedback
          >
            <DatePicker picker='date' onChange={handleChangeShowingDate} />
            <span className='ml-2'>{filmValues?.ngayKhoiChieu}</span>
          </Form.Item>
          <Form.Item name="trailer" label="Trailer" rules={[
            {
              required: true,
              message: '*Required'
            },
            {
              type: 'url',
              message: 'Please enter a valid trailer url'
            }
          ]}
            hasFeedback
          >
            <Input name='trailer' onChange={handleChange} />
          </Form.Item>
          <Form.Item name='moTa' label="Description" rules={[
            {
              required: true,
              message: '*Required'
            }
          ]}
            hasFeedback
          >
            <Input name='moTa' onChange={handleChange} />
          </Form.Item>
          <Form.Item name='danhGia' label="Rating" rules={[
            {
              required: true,
              message: '*Required - input a valid number'
            }
          ]}
            hasFeedback
          >
            <InputNumber min={0} max={10} name='danhGia' onChange={handleChangeRating} />
          </Form.Item>
          <Form.Item name='biDanh' label="Aliases" rules={[
            {
              required: true,
              message: '*Required'
            }
          ]}
            hasFeedback
          >
            <Input name='biDanh' onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Showing" valuePropName="checked">
            <Switch checked={filmValues.dangChieu} name='dangChieu' onChange={handleChangeSwitchDangChieu} />
          </Form.Item>
          <Form.Item label="Coming soon" valuePropName="checked">
            <Switch checked={filmValues.sapChieu} name='sapChieu' onChange={handleChangeSwitchSapChieu} />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch checked={filmValues.hot} name='hot' onChange={handleChangeSwitchHot} />
          </Form.Item>
          <Form.Item
            name='hinhAnh'
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (fileList && fileList[0].size > 9000000) {
                      reject("File size exceeded");
                    } else {
                      resolve("Success");
                    }
                  })
                }
              }
            ]}
          >
            <Upload
              accept='.png,.jpg,.gif'
              listType="picture-card"
              maxCount={1}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  if (file.size > 9000000) {
                    reject("File size exceeded");
                  } else {
                    resolve("Success");
                  }
                })
              }}
              customRequest={(info) => {
                console.log(info.file);
                handleChangeImage(info.file);
                setFilmValues({ ...filmValues, hinhAnh: [...info.file] });
              }}
              showUploadList={false}
            >
              <div className='flex flex-col'>
                <PlusOutlined />
                <span className='mt-2'>Upload image</span>
              </div>
            </Upload>
          </Form.Item>
          {imgSrc && <div className='flex justify-center w-1/2 ml-4 mb-5'>
            <img src={imgSrc} alt='filmImage' style={{ width: 150, height: 150 }} />
          </div>}
          <div className='grid grid-cols-5'>
            <button className='col-start-2 col-span-1 py-2 rounded-lg bg-gray-200 text-red-600 border border-1 mr-4' onClick={() => navigate(-1)}>Back</button>
            <Button className='h-full bg-orange-700 text-white hover:text-white' htmlType='submit' rounded='lg'>Update</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EditFilm;