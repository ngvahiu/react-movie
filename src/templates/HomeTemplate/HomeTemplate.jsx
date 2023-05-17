import React from 'react'
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import { Outlet } from 'react-router-dom';

function HomeTemplate() {

    return <div style={{ backgroundColor: '#202020', minHeight: '100vh' }}>
        <Header />

        {/* render child components here */}
        <div style={{ paddingTop: '60px' }}>
            <Outlet />
        </div>
        {/* <Outlet /> */}

        <Footer />
    </div>
}

export default HomeTemplate