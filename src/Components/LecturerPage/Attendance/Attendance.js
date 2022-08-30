import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import './attendance.css'

import Row from './Row'
import Button from 'react-bootstrap/esm/Button'

export default function Attendance() {

    const [attendanceRows, setAttendanceRows] = useState([])
    const [attendanceUpdate, setAttendanceUpdate] = useState([])

    // temp
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.max-strikes-input').value = 3;
    })
    // temp

    function handleSubmit(e) {
        // console.log(attendanceUpdate)
        try {

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        // const attendanceRows_session = JSON.parse(sessionStorage.getItem('attendanceRows'));

        // test data
        const attendanceRows_session = [
            {
                name: 'Rayyaan',
                attendance: 0,
                strikes: 2,
                indexNumber: 8211111
            },
            {
                name: 'Andy',
                attendance: 2,
                strikes: 0,
                indexNumber: 8233333
            }
        ]

        let temp_attendance_update = []
        setAttendanceRows(
            attendanceRows_session?.map((studentObj, index) => {
                temp_attendance_update.push(
                    {
                        indexNumber: studentObj.indexNumber,
                        attendance: studentObj.attendance,
                        strikes: studentObj.strikes
                    }
                )
                return (
                    <Row key={index}
                        id={index}
                        indexNumber={studentObj.indexNumber}
                        name={studentObj.name}
                        attendance={studentObj.attendance}
                        strikes={studentObj.strikes}
                        handleAttendanceUpdate={handleAttendanceUpdate}
                    />
                )
            })
        );

        // console.log(temp_attendance_update)
        setAttendanceUpdate(temp_attendance_update);

    }, [])

    function handleAttendanceUpdate(indexNumber, attendance, strikes) {
        console.log('in')
        setAttendanceUpdate(prev => prev.map(obj => {
            if (indexNumber === obj.indexNumber) {
                // console.log('match')
                console.log('at: ', attendance)
                console.log('obj at: ', obj.attendance)

                obj.attendance += attendance;
                obj.strikes += strikes;
                return obj;
            }
            else {
                // console.log('no match')
                return obj;
            }
        }))
    }

    useEffect(() => {
        console.log('attendanceUpate: ', attendanceUpdate)
    }, [attendanceUpdate])

    return (
        <div className='attendance'>
            <div className='attendance-header'>
                <div className='max-strikes-div'>
                    Max Strikes:
                <Form.Control type='number' className='max-strikes-input' />
                </div>
                <Button className='submit-btn' onClick={(e) => handleSubmit(e)}>Submit</Button>
            </div>
            <div className='attendance-list'>
                <Table hover bordered className='table'>
                    <thead>
                        <tr>
                            <th>Students</th>
                            <th>Strikes</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendanceRows
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
