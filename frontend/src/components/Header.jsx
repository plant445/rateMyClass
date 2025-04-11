import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom' 
import '../index.css';
import LoginModal from './LoginModal';

const Header = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className='mt-10 w-full flex items-center font-atma font-semibold'>
                <div className='flex pr-5 ml-auto'>
                    <Link to='/' className='px-2 hover:underline'>HOME</Link>
                    <Link to='/reviews' className='px-2 hover:underline'>REVIEWS</Link>
                    <Link to='/create' className='px-2 hover:underline'>RATE</Link>

                    <button onClick={() => setShowModal(true)}
                    className='px-2 hover:underline'>
                        LOGIN
                    </button>
                </div>
            </div>
            {showModal && <LoginModal onClose={() => setShowModal(false)}/>}
        </div>
    )
}

export default Header