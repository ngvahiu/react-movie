import React from 'react'
import { Outlet } from 'react-router-dom'

function UserTemplate() {
    return <div className='flex flex-col justify-between' style={{
        backgroundImage: `url(${require("../../assets/background-1.jpg")})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        minHeight: '75vh',
    }}>
        {/* render child components here */}
        <div className='flex justify-center items-center mt-20'>
            <Outlet />
        </div>
    </div>
}

export default UserTemplate