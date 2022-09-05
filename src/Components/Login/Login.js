import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormLabel from 'react-bootstrap/FormLabel'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import './login.css'

import bgImage from './bg.png'
import URL from '../URL'    // server url

const toastMessages = ['Please fill in all fields', 'Invalid ID or Password']

export default function Login() {
    // show or hide state: login modal
    const [showModal, setShowModal] = useState(false);
    // L = lecturer | S = Student. Default = L
    const [user, setUser] = useState('L');
    // show or hide state: toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const navigate = useNavigate()

    // check if all fields are filled in
    function validateInputs(e) {
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        let staff_id;
        if (user === 'L')
            staff_id = document.querySelector('#staff_id').value;

        if ((user === 'L' && (!username || !password || !staff_id)) ||
            (user === 'S' && (!username || !password))) {
            setToastMessage(toastMessages[0]);  // message: please fill in all fields
            setShowToast('true');
        }
        // call handle submit if all inputs are filled
        else {
            if (user === 'L')
                handleLecturerSubmit(username, password, staff_id);
            else
                handleStudentSubmit(username, password);
        }
    }

    async function handleLecturerSubmit(username, password, staff_id) {
        try {
            const response = await fetch(`${URL}/lecturerlogin`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    staff_id: staff_id
                })
            });

            const data = await response.json();
            const assignedCourses = data.assignedCourses;

            if (!assignedCourses) {
                localStorage.setItem('staff_id', staff_id);
                localStorage.setItem('assignedCourses', JSON.stringify(assignedCourses));
                navigate('/lecturer/courses');
            }
            else {  // invalid details
                setToastMessage(toastMessages[1]);  // message: invalid id or password
                setShowToast(true);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleStudentSubmit(username, password) {
        const response = await fetch(`${URL}/studentlogin`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        const studentData = data.studentData;

        if (!studentData) {
            const indexNumber = studentData.indexNumber;
            const registeredCourses = studentData.registeredCourses;
            localStorage.setItem('indexNumber', indexNumber);
            localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
            navigate('/student/courses');
        }
        else {  // invalid details
            setToastMessage(toastMessages[1]);  // message: invalid id or password
            setShowToast(true);
        }


        // sessionStorage.setItem('currentPage', 'C');
        // navigate('/lecturer/courses')

    }

    return (
        <div className='login_page'>
            <img src={bgImage} className='bg_img' alt='' />
            <div className='bg_img_shade'></div>

            {/* toast for error messages */}
            <Toast show={showToast}
                onClose={() => setShowToast(false)}
                bg='danger'
                autohide
                delay={3000}
                className='toast'
            >
                <Toast.Body>
                    {toastMessage}
                </Toast.Body>
            </Toast>

            <div className='login_form'>
                <div className='app_name'>
                    <span className='cl'>CL</span><span>AIM</span>
                </div>
                <div className='welcome_text'>
                    Please login to access the site features
                </div>
                <div className='login_btns'>
                    <div>
                        <Button className='lecturer_login_btn'
                            onClick={() => { setShowModal(true); setUser('L') }}>
                            Lecturer login
                        </Button>
                    </div>
                    <div>
                        <Button className='student_login_btn'
                            onClick={() => { setShowModal(true); setUser('S') }}>
                            Student login
                          </Button>
                    </div>
                </div>
            </div>

            {/* modal to take login credentials */}
            <Modal onHide={() => setShowModal(false)}
                show={showModal}
                backdrop='static'
                className='login_modal'
            >
                <Modal.Body>
                    <div className='modal_header'>
                        <Button className='close_btn' onClick={() => setShowModal(false)}>&times;</Button>
                        {user === 'L' ? <span>Lecturer Login</span> : <span>Student Login</span>}
                    </div>
                    <div>
                        <div className='field mb-2'>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Form.Control placeholder='Uzumaki Naruto' id='username' />
                        </div>
                        <div className='field mb-2'>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Form.Control type='password' placeholder='####' id='password' />
                        </div>
                        {user === 'L' ?
                            <div className='field'>
                                <FormLabel htmlFor='staff_id'>Staff ID</FormLabel>
                                <Form.Control placeholder='####' id='staff_id' />
                            </div> : ''
                        }
                        <div>
                            <Button className='login_btn' onClick={validateInputs}>Submit</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}