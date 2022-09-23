import React from 'react'
import './marksInstance.css'

export default function MarksInstance({ date, marks }) {

    return (
        <div className='marks_instance'>
            <div className='date'>{date}</div>
            <div className='date_marks'>{marks}</div>
        </div>
    )
}
