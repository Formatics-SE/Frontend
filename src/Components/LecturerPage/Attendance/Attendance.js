import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import './attendance.css'
import Row from './Row'
import { URL } from '../../URL'

export default function Attendance() {

    const [attendanceRows, setAttendanceRows] = useState([])
    // holds the updated attendance objects for students
    const [attendanceUpdate, setAttendanceUpdate] = useState([])
    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [maxAbsentStrikes, setMaxAbsentStrikes] = useState(0)

    const [showMessageToast, setShowMessageToast] = useState(false);
    const [showLoadingToast, setShowLoadingToast] = useState(false);
    const [message, setMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')

    useEffect(async () => {
        let attendanceInfo_session = JSON.parse(sessionStorage.getItem('attendance'));
        // if attendanceInfo_session is null, the page was navigate to either by url or the floating nav, hence fetch the data 
        if (!attendanceInfo_session) {
            setShowLoadingToast(true);
            try {
                const response = await fetch(`${URL}/fetchattendance`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ courseCode: sessionStorage.getItem('courseCode') })
                });

                const data = await response.json();
                setShowLoadingToast(false);

                attendanceInfo_session = data?.info;
                // save the fetched data in session
                sessionStorage.setItem('attendance', JSON.stringify(data?.info));
            }
            catch (error) {
                console.log(error.message)
            }
        }
        // make sure the active page on  the floating nav is the Attendance page
        localStorage.setItem('currentPage', 'R');

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
        setShowLoadingToast(true);
        e.target.disabled = true;
        try {
            const response = await fetch(`${URL}/updateattendance`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    courseCode: courseCode,
                    attendanceData: attendanceUpdate,
                    maxAbsentStrikes: maxAbsentStrikes
                })
            });

            const data = await response.json();
            e.target.disabled = false;
            setShowLoadingToast(false);

            if (data.successful) {
                setMessage('Successfully applied updates !')
                setToastVariant('success')
            }
            else {
                setMessage('Could not apply updates !')
                setToastVariant('danger')
            }
            setShowMessageToast(true);

        } catch (error) {
            console.log(error)
        }

    }
    // end submit

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

            {/* message toast */}
            <Toast show={showMessageToast}
                onClose={() => setShowMessageToast(false)}
                bg={toastVariant}
                autohide
                delay={3000}
                className='toast-message'
            >
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>

            {/* loading toast */}
            <Toast show={showLoadingToast}
                onClose={() => setShowMessageToast(false)}
                bg='secondary'
                autohide
                delay={3000}
                className='loading_toast'
            >
                <Toast.Body>
                    <Spinner className='spinner'
                        animation='border'
                        size='md'
                    />
                </Toast.Body>
            </Toast>
        </div>
    )
}
