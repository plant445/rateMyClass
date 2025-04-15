import React, { use, useEffect,  } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom' 
import '../index.css';
import LoginModal from './LoginModal';
import axios from 'axios';

export default function Header({ username, setUsername, onShowModal }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, {withCredentials: true})
            setUsername('')
            navigate('/')
        } catch (err) {
            console.error('Logout failed:', err);
        }
    }

    const handleClick = () => {
        if (!username) {
            onShowModal()
        } else {
            navigate('/create')
        }
    }


    return (  
            <div className='mt-8 w-full flex items-center font-atma font-semibold mb-6'>
                <div className='flex pr-5 ml-auto'>
                    <Link to='/' className='px-2 hover:underline'>HOME</Link>
                    <Link to='/reviews' className='px-2 hover:underline'>REVIEWS</Link>

                    <button onClick={handleClick} className='px-2 hover:underline h-full'>
                        RATE
                    </button>

                    {username ? (
                        (
                            <div
                            className="relative pb-2 ml-2"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                            <button className="hover:underline">
                                {username} ▾
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 w-32 text-black text-sm">
                                <Link
                                    to={`/reviews/${username}`}
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                                </div>
                            )}
                            </div>
                                                    )
                    ) : (
                    <button onClick={onShowModal} className="px-2 hover:underline">
                        LOGIN
                    </button>
                    )}
                </div>
            </div>
    );
  }
  