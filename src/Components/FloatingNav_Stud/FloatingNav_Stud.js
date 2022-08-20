import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPoll } from 'react-icons/fa'
import { BsFileEarmarkDiffFill } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import { SiCoursera } from 'react-icons/si'
import './floating_nav_stud.css'

/*
    Page IDs:
    G = Groups page
    P = Poll page
    M = marks page
    C = Course Selection page/
*/

export default function FloatingNav_Stud() {

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState('');

    /* rewriting sessionStorage's setItem method in order to get current page 
     * value whenever it changes */
    sessionStorage.setItem = (key, value) => {
        const event = new Event('monitorItemChange');
        event.key = key;
        event.value = value;
        document.dispatchEvent(event);
    }
    document.addEventListener('monitorItemChange', e => {
        setCurrentPage(e.value);
    })
    // end

    // on refresh or page load, get the current page from local storage
    useEffect(() => {
        setCurrentPage(localStorage.getItem('currentPage'));
    }, [])
  
    /* save current page value whenever it changes
     * hide floating nav in course selection page */
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
        const floating_nav = document.querySelector('.floating_nav');
        if (currentPage === 'C')
            floating_nav.style.bottom = '-80px';
        else
            floating_nav.style.bottom = '20px';
    }, [currentPage])

    return (
        <div className='floating_nav'>
            <div className='nav_marks' onClick={() => { setCurrentPage('M'); navigate('/lecturer/marks') }}>
                <BsFileEarmarkDiffFill className={`icon marks_icon ${currentPage === 'M' ? 'active' : ''}`} />
                <span className={`d-none d-md-inline marks_span ${currentPage === 'M' ? 'active' : ''}`}>Marks</span>
            </div>
            <div className='nav_courses' onClick={() => { setCurrentPage('C'); navigate('/lecturer/courses') }}>
                <SiCoursera className={`icon course_icon ${currentPage === 'C' ? 'active' : ''}`} />
                <span className={`d-none d-md-inline course_span ${currentPage === 'C' ? 'active' : ''}`}>Courses</span>
            </div>
            <div className='nav_groups' onClick={() => { setCurrentPage('G'); navigate('/lecturer/groups') }}>
                <HiUserGroup className={`icon groups_icon ${currentPage === 'G' ? 'active' : ''}`} />
                <span className={`d-none d-md-inline group_span ${currentPage === 'G' ? 'active' : ''}`}>Groups</span>
            </div>
            <div className='nav_poll' onClick={() => { setCurrentPage('P'); navigate('/lecturer/poll') }}>
                <FaPoll className={`icon poll_icon ${currentPage === 'P' ? 'active' : ''}`} />
                <span className={`d-none d-md-inline poll_span ${currentPage === 'P' ? 'active' : ''}`}>Poll</span>
            </div>
        </div>
    )
}
