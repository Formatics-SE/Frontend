import React from 'react'
import './floating_nav_lect.css'

export default function FloatingNav() {
    return (
        <div className='floating_nav'>
            <div className='nav_attendance'>
                <span>Attendance</span>
            </div>
            <div className='nav_marks'>
                <span>Marks</span>
            </div>
            <div className='nav_groups'>
                <span>Groups</span>
            </div>
            <div className='nav_poll'>
                <span>Poll</span>
            </div>
        </div>
    )
}
