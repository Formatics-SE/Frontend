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

    useEffect(() => {
        async function fetchData() {
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

                group_session = data?.group;
                // save the fetched data in session
                sessionStorage.setItem('group', JSON.stringify(data?.group));
            }
            catch (error) {
                console.log(error.message)
            }
            // make sure the active page on  the floating nav is the Attendance page
            localStorage.setItem('currentPage', 'G');

            console.log('fetched group: ', group_session)

            // display no groups page if there are no groups created for this course
            if (!group_session) {
                setNoCreatedGroup(true);
            }
            else {
                setNoCreatedGroup(false);
                setStudentGroup(
                    <Card className="cards-container">
                        <Card.Body className="cards-body">
                            <Card.Title className="cards-title-score">
                                <div>Group {group_session.groupNumber}</div>
                                <div>Score: {group_session.score}</div>
                            </Card.Title>
                            <Card.Text className="members">
                                {group_session.members.map((student, index) => {
                                    return (
                                        <li key={index}>{student.name}: {student.indexNumber}</li>
                                    )
                                })}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                );
            }
        }

        fetchData();

    }, [])

    return (
        <div className='student_group_page'>
            <div className='course-info'>
                {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
            </div>

            {
                noCreatedGroup ?
                    <div className='no_groups_message'>No groups have been created for this course</div>
                    :
                    <div className='student_group_card'>{studentGroup}</div>
            }

            {/* loading toast */}
            <Toast show={showLoadingToast}
                onClose={() => setShowLoadingToast(false)}
                bg='secondary'
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
