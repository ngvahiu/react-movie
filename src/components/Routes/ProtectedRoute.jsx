import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { user } = useSelector(state => state.UserReducer);
    const { pathname } = useLocation();

    //nếu chưa đăng nhập, điều hướng về trang đăng nhập (kèm với url của trang seats vừa truy cập)
    if (!user) {
        return <Navigate to={`/signin?redirectUrl=${pathname}`} replace />
    }
    return children;
}

export default ProtectedRoute