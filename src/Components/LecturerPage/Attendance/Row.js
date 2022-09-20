import React, { useState, useEffect } from 'react'

import './row.css'

export default function Row({ id, name, attendance, strikes, indexNumber, handleAttendanceUpdate, handleStrikesUpdate }) {

    const [attendance_s, setAttendance] = useState(attendance);
    const [strikes_s, setStrikes] = useState(strikes);
    const [maxAbsentStrikes, setMaxAbsentStrikes] = useState(0);

    // rewriting localStorage's setItem method for getting the changed max absence value
    localStorage.setItem = (key, value) => {
        const event = new Event('monitorItemChange');
        event.key = key;
        event.value = value;
        document.dispatchEvent(event);
    }
    document.addEventListener('monitorItemChange', (e) => {
        if (e.key === 'maxStrikes') {
            setMaxAbsentStrikes(e.value);
        }
    })

    useEffect(() => {
        const maxStrikes = document.querySelector('.max-strikes-input').value;
        // set the bg-color of that row to light red if that student's strikes is >= the max strikes
        if (strikes_s >= parseInt(maxStrikes))
            document.querySelector(`.tr${id}`).style.backgroundColor = 'rgb(240, 113, 113)';
        else
            document.querySelector(`.tr${id}`).style.backgroundColor = 'white';
    }, [strikes_s, maxAbsentStrikes])

    return (
        <tr className={`accendance-record tr${id}`}>
            <td>{name}</td>   {/* name */}
            <td>{indexNumber}</td>   {/* index number */}
            <td>
                <div className='strikes-and-btn'>
                    <div>{strikes_s}</div>    {/* strikes */}
                    <div className='btn'
                        onClick={() => {
                            handleStrikesUpdate(indexNumber, strikes_s + 1);
                            setStrikes(prev => (prev + 1))
                        }}
                    >+</div>
                    <div className='btn'
                        onClick={() => {
                            handleStrikesUpdate(indexNumber, strikes_s - 1);
                            setStrikes(prev => {
                                if (prev === 0) return prev;
                                else return (prev - 1);
                            })
                        }}
                    >- </div>
                </div>
            </td>
            <td>
                <div className='strikes-and-btn'>
                    <div>{attendance_s}</div> {/* attendance */}
                    <div className='btn'
                        onClick={() => {
                            handleAttendanceUpdate(indexNumber, attendance_s + 1);
                            setAttendance(prev => (prev + 1))
                        }}
                    >+</div>
                    <div className='btn'
                        onClick={() => {
                            handleAttendanceUpdate(indexNumber, attendance_s - 1);
                            setAttendance(prev => {
                                if (prev === 0) return prev;
                                else return (prev - 1);
                            })
                        }}
                    >-</div>
                </div>
            </td>
        </tr>
    )
}
