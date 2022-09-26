import React, { useState, useEffect } from 'react'

import './marks.css'
import MarksInstance from './MarksInstance'
import { URL } from "../../URL"


export default function Marks() {

    const [marks, setMarks] = useState([])
    const [noAvailableMarks, setNoAvailableMarks] = useState(false)

    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')

    const [showMessageToast, setShowMessageToast] = useState(false);
    const [showLoadingToast, setShowLoadingToast] = useState(false);
    const [message, setMessage] = useState('No match')
    const [toastVariant, setToastVariant] = useState('success')

    useEffect(async () => {
        setShowLoadingToast(true);
        let marks_session;
        try {
            const response = await fetch(`${URL}/fetchstudentmarks`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    courseCode: sessionStorage.getItem('courseCode'),
                    indexNumber: sessionStorage.getItem('indexNumber')
                })
            });

            const data = await response.json();
            setShowLoadingToast(false);

            marks_session = data?.info;
            sessionStorage.setItem('marks', JSON.stringify(data?.info));
        }
        catch (error) {
            console.log(error.message)
        }
        // make sure the active page on  the flaoting nav is the Marks page
        localStorage.setItem('currentPage', 'M');

        setCourseName(marks_session?.courseName)
        setCourseCode(marks_session?.courseCode)

        setMarks(marks_session?.marksArray.map((marksObj, index) => {
            return (
                <MarksInstance key={index}
                    date={marksObj.date}
                    marks={marksObj.marks}
                />
            )
        }))

        console.log('marks array: ', marks_session?.marksArray)

        if (marks_session?.marksArray.length === 0) {
            setNoAvailableMarks(true);
        }
        else {
            setNoAvailableMarks(false);
        }

    }, [])

    return (
        <div className='student_marks'>
            <div className='course-info'>
                {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
            </div>
            <div className='marks_and_no_marks'>
                {
                    noAvailableMarks ?
                        <div className="no_marks_message">No marks available for this course</div>
                        :
                        <div className='student_marks_container'>{marks}</div>
                }
            </div>

        </div>
    )
}
