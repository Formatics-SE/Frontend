import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import 'bootstrap/dist/css/bootstrap.min.css'

import './header.css'

import bg from '../Login/bg.png'

export default function Header() {

    const [menuActive, setMenuActive] = useState(false);

    const navigate = useNavigate();

    return (
        <div className='header'>
            <div className='filter1'></div> {/* background design */}
            <div className='filter2'></div> {/* background design */}
            <div className='menu_icon d-block d-md-none'
                onClick={() => {
                    let menuClassList = document.querySelector('.menu').classList;
                    if (menuClassList.contains('active')) {menuClassList.remove('active'); setMenuActive(false)}
                    else {menuClassList.toggle('active'); setMenuActive(true)}
                    console.log(menuClassList);
                }}
            >
                {menuActive ? <AiOutlineClose />: <AiOutlineMenu />}
            </div>
            <div className='app_name'>
                App Name 
            </div>
            <div className='name_and_signout'>
                <div className='name d-none d-md-block'>
                    username
                </div>
                <div className='signout d-none d-md-block' onClick={() => navigate('/login')}>
                    <FaSignOutAlt className='signout_icon' />
                    <span>signout</span>
                </div>
            </div>
            <div className='menu d-block d-md-none'>
                <ul>
                    <li>
                        <FaUser className='user_icon' />
                        <span>username</span>
                    </li>
                    <li>
                        <div className='signout' onClick={() => navigate('/login')}>
                            <FaSignOutAlt className='signout_icon' />
                            <span>signout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
