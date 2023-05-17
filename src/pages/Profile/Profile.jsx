import { Tabs } from 'antd';
import React, { useEffect } from 'react'
import './Profile.scss'
import ButtonMovie from '../../components/ButtonMovie/ButtonMovie';
import { useDispatch, useSelector } from 'react-redux';
import { getInformationAction } from '../../redux/reducers/slices/userSlice/userSlice';
import moment from 'moment';
import { DATE_FORM } from '../../util/settings/Config';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { information, profileTab } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInformationAction());
    }, [])

    return (
        <div className='pt-10 py-5 flex justify-center profile-tabs' style={{width: '80%'}}>
            <Tabs className='bg-white bg-opacity-30 p-4 tabs-profile' defaultActiveKey={profileTab} items={[
                {
                    key: 1,
                    label: `Profile`,
                    children: <ProfileContent information={information} />,
                },
                {
                    key: 2,
                    label: `Booking history`,
                    children: <BookingHistoryContent bookingInformation={information?.thongTinDatVe} />,
                }
            ]} />
        </div>
    )
}

export default Profile

function ProfileContent({ information }) {
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center h-full'>
            <table class="table-auto bg-white bg-opacity-40 sm:py-2 py-1" style={{ width: '80%' }}>
                <thead>
                    <tr>
                        <td className='text-center font-bold text-fixed-4'>Name</td>
                        <td className='text-center text-fixed-4'>{information?.hoTen}</td>
                    </tr>
                    <tr>
                        <td className='text-center font-bold text-fixed-4'>Account</td>
                        <td className='text-center text-fixed-4'>{information?.taiKhoan}</td>
                    </tr>
                    <tr>
                        <td className='text-center font-bold text-fixed-4'>Password</td>
                        <td className='text-center text-fixed-4'>{information?.matKhau}</td>
                    </tr>
                    <tr>
                        <td className='text-center font-bold text-fixed-4'>Email</td>
                        <td className='text-center text-fixed-4'>{information?.email}</td>
                    </tr>
                    <tr>
                        <td className='text-center font-bold text-fixed-4'>Phone number</td>
                        <td className='text-center text-fixed-4'>{information?.soDT}</td>
                    </tr>
                    <tr>
                        <td className='text-center font-bold text-fixed-4'>Role</td>
                        <td className='text-center text-fixed-4'>{information?.loaiNguoiDung.tenLoai}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className='text-right py-3'>
                            <ButtonMovie type={'button'} px={8} py={2} rounded={'lg'} handleClick={() => {
                                navigate(`/user/profile/${information?.taiKhoan}/edit`);
                            }}>
                                Edit
                            </ButtonMovie>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>

    )
}

function BookingHistoryContent({ bookingInformation }) {
    const renderBookingInformation = () => {
        return bookingInformation?.map((item) => {
            return <div className='bg-white rounded-lg grid grid-cols-3 overflow-hidden xl:min-h-[250px] lg:min-h-[220px] md:min-h-[150px] card-profile'>
                <img src={item.hinhAnh} alt='film banner' className='col-span-1 h-full w-full' />
                <div className='px-2 py-4 col-span-2'>
                    <h5 className="xl:text-5xl lg:text-3xl text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white text-fixed-3">
                        {item.tenPhim}
                    </h5>
                    <p className='xl:text-lg lg:text-base md:text-sm font-normal text-orange-500 text-fixed-4'>
                        {item.danhSachGhe[0].tenHeThongRap} - {item.danhSachGhe[0].tenRap}
                    </p>
                    <p className="font-normal text-gray-500 xl:text-base md:text-sm text-fixed-4">
                        <span className='text-black font-semibold'>Duration:</span> {item.thoiLuongPhim} mins
                    </p>
                    <p className="font-normal text-gray-500 xl:text-base md:text-sm text-fixed-4">
                        <span className='text-black font-semibold'>Booking date:</span> {moment(item.ngayDat).format(DATE_FORM + " | hh:mm")}
                    </p>
                    <p className="font-normal text-gray-500 xl:text-base md:text-sm text-fixed-4">
                        <span className='text-black font-semibold mr-1'>Seats:</span>
                        {item.danhSachGhe.map(seat => {
                            return seat.tenGhe + ' '; 
                        })}
                    </p>
                    <p className="font-normal text-gray-500 xl:text-base md:text-sm text-fixed-4">
                        <span className='text-black font-semibold'>Payment:</span> {(item.giaVe * item.danhSachGhe.length).toLocaleString()} VND
                    </p>
                </div>
            </div>
        })
    }
    return (
        <div className='sm:p-3 flex justify-center'>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                {renderBookingInformation()}
            </div>
        </div>
    )
}