import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { SignInAction, resetSignUp } from '../../redux/reducers/slices/userSlice/userSlice'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import Swal from 'sweetalert2'
import { USER_LOGIN } from '../../util/settings/Config'
import './SignIn.scss'
import { Checkbox } from 'antd'

//Định nghĩa các xác thực cho thuộc tính
const schema = yup.object({
  taiKhoan: yup.string().required("*Required"),
  matKhau: yup.string().required("*Required")
})

function SignIn() {
  return (
    <div className='py-5' style={{
      backgroundImage: `url(${require("../../assets/background-1.jpg")})`,
      backgroundPosition: 'center',
      backgroundSize: '100% 100%'
    }}>
      <div className='overlay bg-black bg-opacity-30'>
        <div className='py-3 flex justify-center'>
          <FormSignIn />
        </div>
      </div>
    </div>
  )
}

export default SignIn

function FormSignIn() {
  const { user, isLoading, error } = useSelector(state => state.UserReducer);
  const [isShowPass, setIsShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    //Khai báo giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      matKhau: ""
    },
    mode: "onTouched",
    //khai báo schema validation bằng yup
    resolver: yupResolver(schema)
  })

  const handleChangeShowPass = (event) => {
    setIsShowPass(event.target.checked);
  }

  const onSubmit = (values) => {
    dispatch(SignInAction(values));
  }

  const onErrors = (errors) => {
    console.log(errors);
  }

  //đăng nhập sai
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login failed.',
      text: 'Please try to login again !',
      confirmButtonColor: '#ff0000'
    })
  }

  //Kiểm tra nếu có thông tin user ở reducer => đã đăng nhập thành công, back về trang trước hoặc home
  if (user && localStorage.getItem(USER_LOGIN)) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login successfully !',
      showConfirmButton: false,
      timer: 1500
    })

    const url = searchParams.get("redirectUrl") || '/';

    return <Navigate to={url} replace />
  }

  return (
    <div className="max-w-md p-8 space-y-3 rounded-xl bg-white form-signin">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form className="space-y-6 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="space-y-1 text-sm">
          <label className="block text-black font-bold sm:text-base text-xs">Username</label>
          <input {...register("taiKhoan")} type="text" placeholder="Username" className="w-full px-4 sm:py-3 py-1 rounded-md border-gray-700 border border-1 border-gray-700 text-black focus:border-violet-400" />
          {errors.taiKhoan && <span className='sm:text-sm text-xs text-red-600'>{errors.taiKhoan.message}</span>}
        </div>
        <div className="space-y-1 text-sm">
          <label className="block text-black font-bold sm:text-base text-xs">Password</label>
          <input {...register("matKhau")} type={isShowPass ? "text" : "password"} placeholder="Password" className="w-full px-4 sm:py-3 py-1 rounded-md border-gray-700 border border-1 border-gray-700 text-black focus:border-violet-400" />
          <Checkbox onChange={handleChangeShowPass}>Show password</Checkbox>
          <div className="flex justify-between text-xs text-gray-400">
            {errors.matKhau && <span className='sm:text-sm text-xs text-red-600'>{errors.matKhau.message}</span>}
            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
          </div>
        </div>
        <button type='submit' className="block w-full sm:p-3 p-2 sm:text-base text-sm text-white text-center rounded-sm bg-red-600 hover:bg-black transition-all duration-500" disabled={isLoading}>Sign in</button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        <p className="sm:px-3 px-1 sm:text-sm text-xs text-black">Login with social accounts</p>
        <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button aria-label="Log in with Google" className="sm:p-3 p-1 rounded-sm cursor-pointer hover:text-red-600 transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="sm:w-5 sm:h-5 w-3 h-3 fill-current">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
        <button aria-label="Log in with Twitter" className="sm:p-3 p-1 rounded-sm cursor-pointer hover:text-red-600 transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="sm:w-5 sm:h-5 w-3 h-3 fill-current">
            <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
          </svg>
        </button>
        <button aria-label="Log in with GitHub" className="sm:p-3 p-1 rounded-sm cursor-pointer hover:text-red-600 transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="sm:w-5 sm:h-5 w-3 h-3 fill-current">
            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
          </svg>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6">Don't have an account?
        <a rel="noopener noreferrer" href="#" className="underline text-gray-700 font-bold cursor-pointer hover:text-red-600 transition-all duration-500" onClick={() => {
          dispatch(resetSignUp());
          navigate('/signup')
        }}>Sign up</a>
      </p>
    </div>
  )
}


