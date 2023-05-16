import React from 'react';
import './ColumnsGrid.scss'

export default function ColumnsGrid({ hinhAnh, tenCumRap, diaChi, tenRap, ngayChieu, gioChieu }) {
    return (
        <div className=' w-4/5 container mx-auto grid grid-cols-2 border border-2 rounded-lg'>
            <div className='flex items-start pl-2 border border-r-2 border-l-0 border-y-0 pr-2'>
                <img src={hinhAnh} alt='film image' className='w-[50px] h-full film-image'/>
                <div className='ml-3'>
                    <h1 className='text-black font-bold md:text-lg text-base text-fixed-1'>{tenCumRap}</h1>
                    <p className='text-gray-500 font-bold md:text-sm text-xs text-fixed-2'>{diaChi}</p>
                </div>
            </div>
            <div className='text-left pl-2'>
                <h1 className='text-black font-bold md:text-lg text-base text-fixed-1'>{tenRap}</h1>
                <p className='text-gray-500 font-bold md:text-sm text-xs text-fixed-2'>{ngayChieu}~{gioChieu}</p>
            </div>
        </div>
    );
}