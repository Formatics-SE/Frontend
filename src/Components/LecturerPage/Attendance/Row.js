import React, { useState, useEffect } from 'react'

import './row.css'

export default function Row({ id, name, attendance, strikes }) {

    const [name_s, setName] = useState(name);
    const [attendance_s, setAttendance] = useState(attendance);
    const [strikes_s, setStrikes] = useState(strikes);

    useEffect(() => {
        const maxStrikes = document.querySelector('.max-strikes-input').value;
        console.log(maxStrikes)
        if(strikes_s >= maxStrikes) {
            document.querySelector(`.tr${id}`).style.backgroundColor = 'rgb(240, 113, 113)';
        }
        else {
            document.querySelector(`.tr${id}`).style.backgroundColor = 'white';
        }
    }, [strikes_s])

    return (
        <tr className={`accendance-record tr${id}`}>
            <td>{name_s}</td>
            <td className='span-and-btn'>
                <span>{strikes_s}</span>
                <div className='btn'
                    onClick={() => setStrikes(prev => (prev + 1))}
                >
                    +
                </div>
                <div className='btn'
                    onClick={() => setStrikes(prev => {
                        if(prev === 0) return prev;
                        else return (prev - 1);
                    })}
                >
                    -
                </div>
            </td>
            <td className='span-and-btn'>
                <span>{attendance_s}</span>
                <div className='btn'
                    onClick={() => setAttendance(prev => (prev + 1))}
                >
                    +
                </div>
                <div className='btn'
                    onClick={() => setAttendance(prev => {
                        if (prev === 0) return prev;
                        else return (prev - 1);
                    })}
                >
                    -
                </div>
            </td>
        </tr>
    )
}
