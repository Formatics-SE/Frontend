import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import './header.css'

import bg from '../Login/bg.png'

export default function Header({ username }) {

    const navigate = useNavigate();

    return (
        <div className='header'>
            {/* <div className='filter1'></div> background design  */}
            {/* <div className='filter2'></div> background design */}
            <div className='menu_icon d-block d-md-none'
                onClick={() => { document.querySelector('.menu').classList.toggle('active') }}
            >
                <AiOutlineMenu />
            </div>
            <div className='app_name'>
                <span className='cl'>CL</span><span>AIM</span>
            </div>
            <div className='name_and_signout'>
                <div className='name d-none d-md-block'>
                   { username}
                </div>
                <div className='signout d-none d-md-block' onClick={() => navigate('/login')}>
                    <FaSignOutAlt className='signout_icon' />
                    <span>signout</span>
                </div>
            </div>
            <div className='menu d-block d-md-none'>
                <div className='menu_close_btn'
                    onClick={() => { document.querySelector('.menu').classList.remove('active') }}
                >
                    &times;
                </div>
                <div className='ul'>
                    <div className='li'>
                        <FaUser className='user_icon' />
                        <span>username</span>
                    </div>
                    <div className='li'>
                        <div className='signout' onClick={() => navigate('/login')}>
                            <FaSignOutAlt className='signout_icon' />
                            <span>signout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
