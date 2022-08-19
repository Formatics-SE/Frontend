import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaScroll, FaPoll } from 'react-icons/fa'
import { BsFileEarmarkDiffFill } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import { SiCoursera } from 'react-icons/si'
import './floating_nav_lect.css'
import { Navigate } from 'react-router-dom'

/*
    Page IDs:
    G = Groups page
    P = Poll page
    M = marks page
    R = Attendance or Roll Call page
    C = Course Selection page/
*/

export default function FloatingNav() {

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        setCurrentPage(sessionStorage.getItem('currentPage'));
    }, [])

    useEffect(() => {
        sessionStorage.setItem('currentPage', currentPage);
    }, [currentPage])

    // const val = sessionStorage.getItem('currentPage');
    // // console.log('val: ', val)
    // document.querySelector('course_icon').classList.toggle('active');
    // document.querySelector('course_span').classList.toggle('active');

    // sessionStorage.setItem = (key, value) => {
    //     const event = new Event('monitorItemChange');
    //     event.key = key;
    //     event.value = value;
    //     document.dispatchEvent(event);
    // }
    // document.addEventListener('monitorItemChange', e => {
    //     if (e.value === 'C') {
    //         document.querySelector('course_icon').classList.toggle('active');
    //         document.querySelector('course_span').classList.toggle('active');
    //         navigate('lecturer/courses');
    //     }
    // })



    // useEffect(() => {
    //     if (sessionStorage.getItem('coursePage') === 'C');
    //     document.querySelector('course_icon').classList.toggle('active');
    //     document.querySelector('course_span').classList.toggle('active');
    //     navigate('lecturer/courses');
    // }, [])

    return (
        <div className='floating_nav'>
            <div className='nav_attendance' onClick={() => {navigate('/lecturer/rollcall');setCurrentPage('R')}}>
                <FaScroll className={`icon roll_icon ${currentPage === 'R'? 'active' : ''}`} />
                <span className={`d-none d-md-inline roll_span ${currentPage === 'R'? 'active' : ''}`}>Roll Call</span>
            </div>
            <div className='nav_marks'  onClick={() => {setCurrentPage('M'); navigate('/lecturer/marks')}}>
                <BsFileEarmarkDiffFill className={`icon marks_icon ${currentPage === 'M'? 'active' : ''}`} />
                <span className={`d-none d-md-inline marks_span ${currentPage === 'M'? 'active' : ''}`}>Marks</span>
            </div>
            <div className='nav_courses'  onClick={() => {setCurrentPage('C'); navigate('/lecturer/courses')}}>
                <SiCoursera className={`icon course_icon ${currentPage === 'C'? 'active' : ''}`} />
                <span className={`d-none d-md-inline course_span ${currentPage === 'C'? 'active' : ''}`}>Courses</span>
            </div>
            <div className='nav_groups' onClick={() => {setCurrentPage('G'); navigate('/lecturer/groups')}}>
                <HiUserGroup className={`icon groups_icon ${currentPage === 'G'? 'active' : ''}`} />
                <span className={`d-none d-md-inline group_span ${currentPage === 'G'? 'active' : ''}`}>Groups</span>
            </div>
            <div className='nav_poll' onClick={() => {setCurrentPage('P'); navigate('/lecturer/poll')}}>
                <FaPoll className={`icon poll_icon ${currentPage === 'P'? 'active' : ''}`} />
                <span className={`d-none d-md-inline poll_span ${currentPage === 'P'? 'active' : ''}`}>Poll</span>
            </div>
        </div>
    )
}
