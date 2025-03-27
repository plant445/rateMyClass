import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import '../index.css';

const Header = () => {
    return (
        // <div className='bg-gray-200 w-full h-28 flex items-center font-atma font-semibold'>
        <div className='mt-10 w-full flex items-center font-atma font-semibold'>
            {/* <p className='pl-10 pt-2` text-4xl font-custom'>RateMyClass</p> */}
            <div className='flex pr-5 ml-auto'>
                <Link to='/' className='px-2 hover:underline'>HOME</Link>
                <Link to='/reviews' className='px-2 hover:underline'>REVIEWS</Link>
                <Link to='/create' className='px-2 hover:underline'>RATE</Link>
                <Link to='/register' className='px-2 hover:underline'>LOGIN</Link>
            </div>
        </div>
    )
}

export default Header