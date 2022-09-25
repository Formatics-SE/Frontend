import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import Card from "react-bootstrap/Card"

import './groups.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { URL } from "../../URL"

export default function Groups() {

    const [showLoadingToast, setShowLoadingToast] = useState(false);
    const [noCreatedGroup, setNoCreatedGroup] = useState(false);
    const [studentGroup, setStudentGroup] = useState();

    useEffect(async () => {
        setShowLoadingToast(true);
        let group_session;
        try {
            const response = await fetch(`${URL}/fetchstudentgroup`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ courseCode: sessionStorage.getItem('courseCode') })
            });

            const data = await response.json();
            setShowLoadingToast(false);

            group_session = data?.info;
            // save the fetched data in session
            sessionStorage.setItem('group', JSON.stringify(data?.info));
        }
        catch (error) {
            console.log(error.message)
        }
        // make sure the active page on  the floating nav is the Attendance page
        localStorage.setItem('currentPage', 'G');

        // display no groups page if there are no groups created for this course
        if (!group_session?.group) {
            setNoCreatedGroup(true);
        }
        else {
            setNoCreatedGroup(false);
            setStudentGroup(group_session?.group);
        }
    }, [])

    return (
        <div className='student_group_page'>
            <div className='course-info'>
                {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
            </div>

            {
                noCreatedGroup ?
                    <div className='no_group_message'>No groups have been created for this course</div>
                    :
                    studentGroup
            }

            {/* loading toast */}
            <Toast show={showLoadingToast}
                onClose={() => setShowLoadingToast(false)}
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
