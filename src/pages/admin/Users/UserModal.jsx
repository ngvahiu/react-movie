import { Checkbox, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_USER_MODAL } from '../../../redux/reducers/UserManagementReducer/UserManagementTypes';
import ButtonMovie from '../../../components/ButtonMovie/ButtonMovie';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { setUserListAction } from '../../../redux/reducers/UserManagementReducer/UserManagementActions';
import Swal from 'sweetalert2';
import { addUserAPI, updateUserAPI } from '../../../services/ManageUserService';
import { ADD_ACTION, EDIT_ACTION } from '../../../util/settings/Config';

const schema = yup.object({
  taiKhoan: yup
    .string()
    .required("*Required")
    .matches(/^[A-Za-z\d]{8,}$/, "Username must have at least 8 characters, only including alphabets or digits"),
  matKhau: yup
    .string()
    .required("*Required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must have at least 8 characters, including at least 1 alphabet, 1 digit and 1 special character"),
  maLoaiNguoiDung: yup
    .string()
    .required("*Required"),
  hoTen: yup
    .string()
    .required("*Required")
    .matches(/^[A-Za-z ]+$/, "Full name only contains alphabets"),
  email: yup
    .string()
    .required("*Required")
    .email("Email has to be in the right format"),
  soDT: yup
    .string()
    .required("*Required")
    .matches(/^\d{10,}$/, "Phone number has only digits, at least 10 digits")
})

const UserModal = () => {
  const { openModal, purpose, inforToEdit } = useSelector(state => state.UserManagementReducer);
  const [isShowPass, setIsShowPass] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({ type: CLOSE_USER_MODAL })
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      taiKhoan: inforToEdit?.taiKhoan,
      matKhau: inforToEdit?.matKhau,
      maLoaiNguoiDung: inforToEdit?.loaiNguoiDung?.maLoaiNguoiDung,
      hoTen: inforToEdit?.hoTen,
      email: inforToEdit?.email,
      soDT: inforToEdit?.soDT
    },
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const handleChangeShowPass = (event) => {
    setIsShowPass(event.target.checked);
  }

  const onSubmit = async (values) => {
    console.log('values: ', values);

    if (purpose === ADD_ACTION) {
      try {
        await addUserAPI(values);

        await dispatch(setUserListAction());

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Add user successfully !',
          showConfirmButton: false,
          timer: 1500
        })

        reset();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Add user failed.',
          text: error.response?.data?.content,
          confirmButtonColor: "#ff0000"
        })
      }
    } else {
      try {
        await updateUserAPI(values);

        await dispatch(setUserListAction());

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Update user successfully !',
          showConfirmButton: false,
          timer: 1500
        })

        reset({
          taiKhoan: '',
          matKhau: '',
          maLoaiNguoiDung: '',
          hoTen: '',
          email: '',
          soDT: ''
        });
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'Update user failed.',
          text: error.response?.data?.content,
          confirmButtonColor: "#ff0000"
        })
      }
    }
  }

  const onErrors = (errors) => {
    console.log(errors);
  }

  return (
    <>
      <Modal className='p-4' open={openModal} onCancel={handleCancel} footer={false}>
        <h1 className='p-2 text-3xl font-bold border border-t-0 border-x-0 border-b-2'>{purpose === ADD_ACTION ? 'Add' : 'Edit'} user</h1>
        <form className="space-y-6 ng-untouched ng-pristine ng-valid p-4 mt-4" onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="space-y-1 text-sm">
            <label for="username" className="block text-black font-semibold">Username</label>
            <input {...register("taiKhoan")} type="text" placeholder="Username" className={"w-full px-4 py-3 rounded-md border border-1 border-gray-700 focus:border-violet-400 " + (purpose === EDIT_ACTION ? 'text-gray-500 cursor-not-allowed' : 'text-black')} disabled={purpose === EDIT_ACTION} />
            {errors.taiKhoan && <span className='text-sm text-red-600'>{errors.taiKhoan.message}</span>}
          </div>
          <div className="space-y-1 text-sm">
            <label for="password" className="block text-black font-semibold">Password</label>
            <input {...register("matKhau")} type={isShowPass ? "text" : "password"} placeholder="Password" className="w-full px-4 py-3 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400"/>
            <Checkbox onChange={handleChangeShowPass}>Show password</Checkbox>
            {errors.matKhau && <p className='text-sm text-red-600'>{errors.matKhau.message}</p>}
          </div>
          <div className="space-y-1 text-sm">
            <label for="userCode" className="block text-black font-semibold">Role</label>
            <select {...register("maLoaiNguoiDung")} className="w-full px-4 py-3 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400">
              <option value="KhachHang">Customer</option>
              <option value="QuanTri">Admin</option>
            </select>
            {errors.maLoaiNguoiDung && <span className='text-sm text-red-600'>{errors.maLoaiNguoiDung.message}</span>}
          </div>
          <div className="space-y-1 text-sm">
            <label for="fullName" className="block text-black font-semibold">Full name</label>
            <input {...register("hoTen")} type="text" placeholder="Full name" className="w-full px-4 py-3 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
            {errors.hoTen && <span className='text-sm text-red-600'>{errors.hoTen.message}</span>}
          </div>
          <div className="space-y-1 text-sm">
            <label for="email" className="block text-black font-semibold">Email</label>
            <input {...register("email")} type="email" placeholder="abc@gmail.com" className="w-full px-4 py-3 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
            {errors.email && <span className='text-sm text-red-600'>{errors.email.message}</span>}
          </div>
          <div className="space-y-1 text-sm">
            <label for="phoneNumber" className="block text-black font-semibold">Phone number</label>
            <input {...register("soDT")} type="text" placeholder="Phone number" className="w-full px-4 py-3 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
            {errors.soDT && <span className='text-sm text-red-600'>{errors.soDT.message}</span>}
          </div>
          <div className='flex justify-end'>
            <button className='px-3 py-2 rounded-lg bg-gray-200 text-red-600 border border-1 mr-4' onClick={handleCancel}>Cancel</button>
            <ButtonMovie px={6} py={1} rounded={'lg'} type='submit'>{purpose === ADD_ACTION ? 'Add' : 'Edit'}</ButtonMovie>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UserModal;


