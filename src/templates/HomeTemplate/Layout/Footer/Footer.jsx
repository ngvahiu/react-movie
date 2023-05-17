import React, { useEffect } from 'react'
import './Footer.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCinemaSystemAction } from '../../../../redux/reducers/CinemaSystemReducer/CinemaSystemActions';

function Footer() {
  const { cinemaSystem } = useSelector(state => state.CinemaSystemReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = setCinemaSystemAction();
    dispatch(action);
  }, [])

  const renderLogoPartner = () => {
    return cinemaSystem?.map(brand => {
      return <img className='rounded-full my-2 cursor-pointer' src={brand.logo} alt={brand.tenHeThongRap} style={{
        width: 40,
        height: 40
      }} key={brand.maHeThongRap}/>
    })
  }

  return (
    <footer className="footer" style={{ backgroundColor: '#272829'}}>
      <div className='xl:container xl:mx-auto lg:mx-8 mx-5 py-12 grid lg:grid-cols-4 lg:gap-0 grid-cols-2 gap-5'>
        <div className='col-span-1'>
          <div className='footer-logo mb-5 w-4/5'>
            <img className='w-full' src={require('../../../../assets/header-logo.png')} alt='footer-logo' />
          </div>
          <p className='text-gray-500 mb-5 md:text-base text-sm'>
            Here , write the complete address of the Registered office address along with telephone number.
          </p>
          <div className='list-contact flex'>
            <i className="fab fa-twitter mr-4 text-2xl footer-item"></i>
            <i className="fab fa-facebook-f mr-4 text-2xl footer-item"></i>
            <i className="fab fa-instagram mr-4 text-2xl footer-item"></i>
            <i className="fab fa-youtube mr-4 text-2xl footer-item"></i>
          </div>

        </div>
        <div className='col-span-1'>
          <h1 className='text-white sm:text-xl text-sm font-bold'>PARTNER</h1>
          <div className='grid grid-cols-3'>
            {renderLogoPartner()}
          </div>
        </div>
        <div className='col-span-1 lg:mt-0 lg:text-left mt-3 text-center'>
          <h1 className='text-white sm:text-xl text-sm font-bold'>PRODUCTION</h1>
          <ul>
            <li className='footer-item my-3'>2018 Year</li>
            <li className='footer-item my-3'>2019 Year</li>
            <li className='footer-item my-3'>2020 Year</li>
            <li className='footer-item my-3'>2021 Year</li>
          </ul>
        </div>
        <div className='col-span-1 lg:mt-0 lg:text-left mt-3 text-center'>
          <h1 className='text-white sm:text-xl text-sm font-bold'>DISPLAY QUALITY</h1>
          <ul>
            <li className='footer-item my-3'>720p HDTV</li>
            <li className='footer-item my-3'>1080p BluRay</li>
            <li className='footer-item my-3'>720p BluRay</li>
            <li className='footer-item my-3'>1080p WEB-DL</li>
          </ul>
        </div>
      </div>
      <div className='py-4 bg-black'>
        <div className='xl:container xl:mx-auto lg:mx-8 sm:mx-5 mx-1 grid sm:grid-cols-2 grid-cols-1'>
          <div className='copy-right sm:text-left text-center'>
            <p className='text-white sm:text-base text-xs'>© Copyright 2021, All Rights Reserved</p>
          </div>
          <div className='sm:text-right text-center'>
            <span className='footer-item mr-4'>Terms of service</span>
            <span className='footer-item'>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer