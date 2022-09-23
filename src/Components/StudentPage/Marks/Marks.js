import React, { useState, useEffect } from 'react'
import './marks.css'

import MarksInstance from './MarksInstance'

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
        let marks_session = JSON.parse(sessionStorage.getItem('marks'));
        // if marks_session is null, the page was navigate to either by url or the floating nav, hence fetch the data 
        if (!marks_session) {
            setShowLoadingToast(true);
            try {
                const response = await fetch(`${URL}/fetchstudentmarks`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ courseCode: sessionStorage.getItem('courseCode') })
                });

                const data = await response.json();
                setShowLoadingToast(false);

                marks_session = data?.info;
                sessionStorage.setItem('marks', JSON.stringify(data?.info));
            }
            catch (error) {
                console.log(error.message)
            }
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

        if (marks_session?.marksArray.length === 0) {
            setNoAvailableMarks(true);
        }
        else {
            setNoAvailableMarks(false);
        }

        // console.log('marksSession: ', marks_session)


    }, [])

    return (
        <div className='student_marks'>
            <div className='course-info'>
                {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
            </div>
            <div className='student_marks_container'>
            {
                noAvailableMarks ?
                    <div className="no_marks_message">No marks available for this course</div>
                    : marks
            }
            </div>

        </div>
    )
}
