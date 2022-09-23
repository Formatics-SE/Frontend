import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaScroll, FaPoll } from 'react-icons/fa'
import { BsFileEarmarkDiffFill } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import { SiCoursera } from 'react-icons/si'
import './floating_nav_lect.css'

/*
    Page IDs:
    G = Groups page
    P = Polls page
    M = Marks page
    R = Attendance or Roll Call page
    C = Course Selection page
*/

export default function FloatingNav() {

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState('');

    // /* rewriting localStorage's setItem method in order to get current page 
    //  * value whenever it changes */
    localStorage.setItem = (key, value) => {
        const event = new Event('monitorItemChange');
        event.key = key;
        event.value = value;
        document.dispatchEvent(event);
    }
    document.addEventListener('monitorItemChange', (e) => {
        console.log('current page: ', e.value)
        if (e.key === 'currentPage') {
            setCurrentPage(e.value);
        }
    })
    // // end

    // on refresh or page load, get the current page from session storage
    useEffect(() => {
        setCurrentPage(sessionStorage.getItem('currentPage'));
    }, [])

    /* save current page value whenever it changes
     * hide floating nav in course selection page */
    useEffect(() => {
        sessionStorage.setItem('currentPage', currentPage);
        const floating_nav = document.querySelector('.floating_nav_lect');
        if (currentPage === 'C')
            floating_nav.style.bottom = '-80px';
        else
            floating_nav.style.bottom = '20px';
    }, [currentPage])

    return (
        <div className='floating_nav_lect'>
            <div className='nav_attendance' onClick={() => { navigate('/lecturer/rollcall'); setCurrentPage('R') }}>
                <div className='icon_div'><FaScroll className={`icon roll_icon ${currentPage === 'R' ? 'active' : ''}`} /></div>
                <span className={`d-none d-md-inline roll_span ${currentPage === 'R' ? 'active' : ''}`}>Roll Call</span>
            </div>
            <div className='nav_marks' onClick={() => { setCurrentPage('M'); navigate('/lecturer/marks') }}>
                <div className='icon_div'><BsFileEarmarkDiffFill className={`icon marks_icon ${currentPage === 'M' ? 'active' : ''}`} /></div>
                <span className={`d-none d-md-inline marks_span ${currentPage === 'M' ? 'active' : ''}`}>Marks</span>
            </div>
            <div className='nav_courses' onClick={() => { setCurrentPage('C'); navigate('/lecturer/courses') }}>
                <div className='icon_div'><SiCoursera className={`icon course_icon ${currentPage === 'C' ? 'active' : ''}`} /></div>
                <span className={`d-none d-md-inline course_span ${currentPage === 'C' ? 'active' : ''}`}>Courses</span>
            </div>
            <div className='nav_groups' onClick={() => { setCurrentPage('G'); navigate('/lecturer/groups') }}>
                <div className='icon_div'><HiUserGroup className={`icon groups_icon ${currentPage === 'G' ? 'active' : ''}`} /></div>
                <span className={`d-none d-md-inline group_span ${currentPage === 'G' ? 'active' : ''}`}>Groups</span>
            </div>
            <div className='nav_poll' onClick={() => { setCurrentPage('P'); navigate('/lecturer/polls') }}>
                <div className='icon_div'><FaPoll className={`icon poll_icon ${currentPage === 'P' ? 'active' : ''}`} /></div>
                <span className={`d-none d-md-inline poll_span ${currentPage === 'P' ? 'active' : ''}`}>Polls</span>
            </div>
        </div>
    )
}
