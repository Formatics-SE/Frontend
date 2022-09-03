import React, { useState, useEffect } from 'react'

import './row.css'

export default function Row({ id, name, attendance, strikes, indexNumber, handleAttendanceUpdate, handleStrikesUpdate }) {

    const [name_s, setName] = useState(name);
    const [attendance_s, setAttendance] = useState(attendance);
    const [strikes_s, setStrikes] = useState(strikes);

    useEffect(() => {
        const maxStrikes = document.querySelector('.max-strikes-input').value;
        // set the bg-color of that row to light red if that student's strikes is >= the max strikes
        if (strikes_s >= maxStrikes)
            document.querySelector(`.tr${id}`).style.backgroundColor = 'rgb(240, 113, 113)';
        else
            document.querySelector(`.tr${id}`).style.backgroundColor = 'white';
    }, [strikes_s])

    return (
        <tr className={`accendance-record tr${id}`}>
            <td>{name_s}</td>   {/* name */}
            <td className='span-and-btn'>
                <span>{strikes_s}</span>    {/* strikes */}
                <div className='btn'
                    onClick={() => {
                        handleStrikesUpdate(indexNumber, strikes_s + 1);
                        setStrikes(prev => (prev + 1))
                    }}
                >+
                </div>
                <div className='btn'
                    onClick={() => {
                        handleStrikesUpdate(indexNumber, strikes_s - 1);
                        setStrikes(prev => {
                            if (prev === 0) return prev;
                            else return (prev - 1);
                        })
                    }}
                >-
                </div>
            </td>
            <td className='span-and-btn'>
                <span>{attendance_s}</span> {/* attendance */}
                <div className='btn'
                    onClick={() => {
                        handleAttendanceUpdate(indexNumber, attendance_s + 1);
                        setAttendance(prev => (prev + 1))
                    }}
                >+
                </div>
                <div className='btn'
                    onClick={() => {
                        handleAttendanceUpdate(indexNumber, attendance_s - 1);
                        setAttendance(prev => {
                            if (prev === 0) return prev;
                            else return (prev - 1);
                        })
                    }}
                >-
                </div>
            </td>
        </tr>
    )
}
