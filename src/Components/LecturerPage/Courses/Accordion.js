import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import './accordion.css'

export default function Accordion({ id, courseCode, courseName, year, semester, credits, bg, handleSubmit }) {

    return (
        <div className='accordion'>
            <div className='accordion_body'>
                <img src={bg} className='body_bg' />
                <div className='body_bg_overlay'></div>
                <div className='course_code'>{courseCode}</div>
                <div className='year_semester_credits_container'>
                    <div className='year_semester'>Year {year} - Semester {semester}</div>
                    <div className='credits'>Credits: {credits}</div>
                </div>
            </div>
            <div className={`dropdown dp${id}`}
                onClick={(e) => {
                    // get all the dropdown menus and loop through.
                    // only toggle to active the one with a matching class id
                    document.querySelectorAll('.dropdown_menu').forEach(accordion => {
                        if (accordion.classList[1] === `dp${id}`)
                            accordion.classList.toggle('active')
                        else
                            accordion.classList.remove('active')
                    });
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        if (dropdown.classList[1] === `dp${id}`)
                            dropdown.classList.toggle('active')
                        else
                            dropdown.classList.remove('active')

                    });

                }}
            >
                <div className='course_name'>{courseName}</div>
                <div className='dropdown_icon'><IoMdArrowDropdown className='dropdown_icon' /></div>
            </div>
            <div className={`dropdown_menu dp${id}`}>
                <div onClick={() => handleSubmit('attendance', courseCode)}>Roll Call</div>
                <div onClick={() => handleSubmit('marks', courseCode)}>Marks</div>
                <div onClick={() => handleSubmit('groups', courseCode)}>Groups</div>
                <div onClick={() => handleSubmit('polls', courseCode)}>Polls</div>
            </div>

        </div>
    )
}
