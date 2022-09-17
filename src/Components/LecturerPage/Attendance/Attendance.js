import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Row from './Row'
import Button from 'react-bootstrap/Button'
import './attendance.css'

import { URL } from '../../URL'

export default function Attendance() {

    const [attendanceRows, setAttendanceRows] = useState([])
    const [attendanceUpdate, setAttendanceUpdate] = useState([])
    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [maxAbsentStrikes, setMaxAbsentStrikes] = useState(0)

    useEffect(() => {
        const attendanceInfo_session = JSON.parse(sessionStorage.getItem('attendanceInfo'));
        const students = attendanceInfo_session?.registeredStudents;

        setCourseName(attendanceInfo_session?.courseName)
        setCourseCode(attendanceInfo_session?.courseCode)
        setMaxAbsentStrikes(attendanceInfo_session?.maxAbsentStrikes)

        let temp_attendance_update = []

        // create an array of Row components and store state in setAttendanceRows
        setAttendanceRows(
            students?.map((studentObj, index) => {
                // for each student object returned, create an object containing only the student information of interest
                // i.e index number, attendance record and strikes record. These values would be updated when attendance is taken
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
        const courseCode = sessionStorage.getItem('courseCode');
        try {
            const response = await fetch(`${URL}/attendance`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    courseCode: courseCode,
                    attendanceData: attendanceUpdate
                })
            });

            const data = await response.json();
            if (data.successful) {

            }
            else {

            }
        } catch (error) {
            console.log(error)
        }

    }

    function handleAttendanceUpdate(indexNumber, attendance) {
        setAttendanceUpdate(prev => prev.map(obj => {
            if (indexNumber === obj.indexNumber) {
                obj.attendance = attendance;
                return obj;
            }
            else {
                return obj;
            }
        }))
    }

    function handleStrikesUpdate(indexNumber, strikes) {
        setAttendanceUpdate(prev => prev.map(obj => {
            if (indexNumber === obj.indexNumber) {
                obj.strikes = strikes;
                return obj;
            }
            else {
                return obj;
            }
        }))
    }

    return (
        <div className='attendance'>
            <div className='course-info'>
                {courseCode}: {courseName}
                {/* COE 358 : Embedded Systems */}
            </div>
            <div className='max-strikes-and-submit'>
                <div className='max-strikes-div'>
                    Max Strikes:
                <Form.Control type='number'
                        className='max-strikes-input'
                        value={maxAbsentStrikes}
                        onChange={(e) => {
                            setMaxAbsentStrikes(prev => e.target.value < 1 ? prev : e.target.value);
                            // set the new max absence strikes value in the rewritten localStorage's setItem method in order to get the
                            // changed value in Row component
                            if (e.target.value >= 1) localStorage.setItem('maxStrikes', e.target.value)
                        }}
                    />
                </div>
                <div className='submit-btn-div'><Button className='submit-btn' onClick={(e) => handleSubmit(e)}>Submit</Button></div>
            </div>
            <div className='attendance-list'>
                <Table hover bordered className='table'>
                    <thead>
                        <tr>
                            <th>Students</th>
                            <th>Index</th>
                            <th>Strikes</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>{attendanceRows}</tbody>
                </Table>
            </div>
        </div>
    )
}
