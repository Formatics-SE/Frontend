import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Row from './Row'
import Button from 'react-bootstrap/Button'
import './attendance.css'

import URL from '../../URL'

export default function Attendance() {

    const [attendanceRows, setAttendanceRows] = useState([])
    const [attendanceUpdate, setAttendanceUpdate] = useState([])

    // temp
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.max-strikes-input').value = 3;
    })
    // temp

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

        // create an array of Row components and store in state
        setAttendanceRows(
            attendanceRows_session?.map((studentObj, index) => {
                // for each student object returned, create an object containing only the student information of interest
                // : index number, attendance record and strikes record.
                temp_attendance_update.push(
                    {
                        indexNumber: studentObj.indexNumber,
                        attendance: studentObj.attendance,
                        strikes: studentObj.strikes
                    }
                );
                return (
                    <Row key={index}
                        id={index}
                        indexNumber={studentObj.indexNumber}
                        name={studentObj.name}
                        attendance={studentObj.attendance}
                        strikes={studentObj.strikes}
                        handleAttendanceUpdate={handleAttendanceUpdate}
                        handleStrikesUpdate={handleStrikesUpdate}
                    />
                )
            })
        );

        setAttendanceUpdate(temp_attendance_update);

    }, [])

    // post attendance data to server
    async function handleSubmit(e) {
        // console.log(attendanceUpdate)

        const courseCode = sessionStorage.getItem('courseCode');
        try {
            const response  = await fetch(`${URL}/attendance`, {
                method: 'POST',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify({
                    courseCode: courseCode,
                    attendanceData: attendanceUpdate
                })
            });

            const data = await response.json();
            if(data.successful) {

            }
            else {

            }
        } catch (error) {
            console.log(error)
        }

    }

    function handleAttendanceUpdate(indexNumber, attendance) {
        console.log('attendance: ', attendance)
        setAttendanceUpdate(prev => prev.map(obj => {
            if (indexNumber === obj.indexNumber) {
                // console.log('match')
                console.log('at: ', attendance)
                console.log('obj at: ', obj.attendance)

                obj.attendance = attendance;
                return obj;
            }
            else {
                // console.log('no match')
                return obj;
            }
        }))
    }

    function handleStrikesUpdate(indexNumber, strikes) {
        console.log('strikes: ', strikes)
        setAttendanceUpdate(prev => prev.map(obj => {
            if (indexNumber === obj.indexNumber) {
                // console.log('match')
                console.log('at: ', strikes)
                console.log('obj at: ', obj.strikes)

                obj.strikes = strikes;
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
