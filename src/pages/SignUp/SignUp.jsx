import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { SignInAction, SignUpAction, editInformationAction, resetSignUp } from '../../redux/reducers/slices/userSlice/userSlice'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Navigate, useNavigate } from 'react-router-dom'
import { EDIT_ACTION, INFORMATION, SIGN_UP_ACTION } from '../../util/settings/Config'
import './SignUp.scss'
import { Checkbox } from 'antd'

const schema = yup.object({
    taiKhoan: yup
        .string()
        .required("*Required")
        .matches(/^[A-Za-z\d]{8,}$/, "Username must have at least 8 characters, only including alphabets or digits"),
    matKhau: yup
        .string()
        .required("*Required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must have at least 8 characters, including at least 1 alphabet, 1 digit and 1 special character"),
    confirmMatKhau: yup
        .string()
        .required("*Required")
        .oneOf([yup.ref('matKhau'), null], 'Your passwords does not match'),
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
function SignUp({ purpose }) {
    return (
        <div className='py-5' style={{
            backgroundImage: `url(${require("../../assets/background-1.jpg")})`,
            backgroundPosition: 'center',
            backgroundSize: '100% 100%'
        }}>
            <div className='overlay bg-black bg-opacity-30'>
                <div className='py-3 flex justify-center'>
                    <FormSignUp purpose={purpose} />
                </div>
            </div>
        </div>
    )
}

export default SignUp

function FormSignUp({ purpose }) {
    const { userSignUp, isLoading, error, successEditInfor } = useSelector(state => state.UserReducer);
    const [isShowPass, setIsShowPass] = useState(false);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const information = JSON.parse(localStorage.getItem(INFORMATION)) || null;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            taiKhoan: purpose === EDIT_ACTION ? information?.taiKhoan : "",
            matKhau: purpose === EDIT_ACTION ? information?.matKhau : "",
            confirmMatKhau: purpose === EDIT_ACTION ? information?.matKhau : "",
            hoTen: purpose === EDIT_ACTION ? information?.hoTen : "",
            email: purpose === EDIT_ACTION ? information?.email : "",
            soDT: purpose === EDIT_ACTION ? information?.soDT : ""
        },
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const handleChangeShowPass = (event) => {
        setIsShowPass(event.target.checked);
    }

    const onSubmit = async (values) => {
        const payload = {
            taiKhoan: values?.taiKhoan,
            matKhau: values?.matKhau,
            hoTen: values?.hoTen,
            email: values?.email,
            soDT: values?.soDT
        }

        if (purpose === EDIT_ACTION) {
            await dispatch(editInformationAction({ ...payload, maLoaiNguoiDung: information?.maLoaiNguoiDung, resetFormFunc: reset }));

            //cập nhật lại USER_LOGIN trong localStorage bằng action đăng nhập
            await dispatch(SignInAction({
                taiKhoan: values?.taiKhoan,
                matKhau: values?.matKhau
            }));
        } else {
            dispatch(SignUpAction(payload));
        }
    }

    const onErrors = (errors) => {
        console.log(errors);
    }

    //thông báo lỗi đăng ký
    if (error) {
        if (purpose === SIGN_UP_ACTION) {
            Swal.fire({
                icon: 'error',
                title: 'Sign up failed.',
                text: error,
                confirmButtonColor: '#ff0000'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Edit profile failed.',
                text: error,
                confirmButtonColor: '#ff0000'
            })
        }
    }

    //đăng ký thành công thì chuyển sang trang đăng nhập
    if (userSignUp) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign up successfully !',
            showConfirmButton: false,
            timer: 1500
        })
        dispatch(resetSignUp());

        return <Navigate to='/signin' replace />;
    }

    return (
        <div className="max-w-md p-8 space-y-3 rounded-xl bg-white form-signup">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <form novalidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(onSubmit, onErrors)}>
                <div className="space-y-1 text-sm">
                    <label for="username" className="block text-black font-bold sm:text-base text-xs">Username</label>
                    <input {...register("taiKhoan")} type="text" placeholder="Username" className={"w-full sm:text-base text-sm sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 focus:border-violet-400 " + (purpose === EDIT_ACTION ? 'text-gray-500 cursor-not-allowed' : 'text-black')} disabled={purpose === EDIT_ACTION} />
                    {errors.taiKhoan && <span className='sm:text-sm text-xs text-red-600'>{errors.taiKhoan.message}</span>}
                </div>
                <div className="space-y-1 text-sm">
                    <label for="password" className="block text-black font-bold sm:text-base text-xs">Password</label>
                    <input {...register("matKhau")} type={isShowPass ? "text" : "password"} placeholder="Password" className="w-full sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
                    <Checkbox onChange={handleChangeShowPass}>Show password</Checkbox>
                    {errors.matKhau && <p className='sm:text-sm text-xs text-red-600'>{errors.matKhau.message}</p>}
                </div>
                <div className="space-y-1 text-sm">
                    <label for="password" className="block text-black font-bold sm:text-base text-xs">Confirm password</label>
                    <input {...register("confirmMatKhau")} type="password" placeholder="Password" className="w-full sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
                    {errors.confirmMatKhau && <span className='sm:text-sm text-xs text-red-600'>{errors.confirmMatKhau.message}</span>}
                </div>
                <div className="space-y-1 text-sm">
                    <label for="fullName" className="block text-black font-bold sm:text-base text-xs">Full name</label>
                    <input {...register("hoTen")} type="text" placeholder="Full name" className="w-full sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
                    {errors.hoTen && <span className='sm:text-sm text-xs text-red-600'>{errors.hoTen.message}</span>}
                </div>
                <div className="space-y-1 text-sm">
                    <label for="email" className="block text-black font-bold sm:text-base text-xs">Email</label>
                    <input {...register("email")} type="email" placeholder="abc@gmail.com" className="w-full sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
                    {errors.email && <span className='sm:text-sm text-xs text-red-600'>{errors.email.message}</span>}
                </div>
                <div className="space-y-1 text-sm">
                    <label for="phoneNumber" className="block text-black font-bold sm:text-base text-xs">Phone number</label>
                    <input {...register("soDT")} type="text" placeholder="Phone number" className="w-full sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400" />
                    {errors.soDT && <span className='sm:text-sm text-xs text-red-600'>{errors.soDT.message}</span>}
                </div>
                <div className="space-y-1 text-sm">
                    <label for="role" className="block text-black font-bold sm:text-base text-xs">Role</label>
                    <input type="text" name="role" id="role" placeholder="Customer" className="w-full sm:text-base text-sm px-4 sm:py-3 py-1 rounded-md border border-1 border-gray-700 text-black focus:border-violet-400 cursor-not-allowed" disabled value={(purpose === EDIT_ACTION && information?.maLoaiNguoiDung === "QuanTri") ? "Admin" : "Customer"} />
                </div>
                <button type='submit' disabled={isLoading} className="block w-full sm:p-3 p-2 sm:text-base text-sm text-white text-center rounded-sm bg-red-600 hover:bg-black transition-all duration-500">{purpose === SIGN_UP_ACTION ? "SIGN UP" : "EDIT"}</button>
            </form>
        </div>
    )
}