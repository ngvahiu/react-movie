import React from 'react'
import { Outlet } from 'react-router-dom'

function UserTemplate() {
    return <div className='flex flex-col justify-between' style={{
        backgroundImage: `url(${require("../../assets/background-1.jpg")})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '60vh'
    }}>
        {/* render child components here */}
        <div className='flex justify-center items-center'>
            <Outlet />
        </div>
    </div>
}

export default UserTemplate