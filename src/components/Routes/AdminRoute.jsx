import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminRoute({ children }) {
    const { user } = useSelector(state => state.UserReducer);
    // const { pathname } = useLocation();

    //nếu chưa đăng nhập, điều hướng về trang đăng nhập
    if (!user) {
        return <Navigate to='/signin' />
    }
    //nếu không là admin thì không có quyền truy cập, back về trang home
    if (user && user.maLoaiNguoiDung !== "QuanTri") {
        Swal.fire({
            icon: 'error',
            title: 'Only admins are allowed to access this page',
            text: 'Please try to login another account',
            confirmButtonColor: "#ff0000"
        })

        return <Navigate to="/" replace />
    }

    return children;
}

export default AdminRoute