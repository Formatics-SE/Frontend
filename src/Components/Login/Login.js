import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormLabel from 'react-bootstrap/FormLabel'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import './login.css'

import bgImage from './bg.png'

const toastMessages = ['please fill in all fields', 'invalid id or password']

const URL = 'http://127.0.0.1:2022';

export default function Login() {
    // show or hide state: login modal
    const [showModal, setShowModal] = useState(false);
    // L = lecturer | S = Student. Default = L
    const [user, setUser] = useState('L');
    // show or hide state: toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const navigate = useNavigate();

    // check if all fields are filled in
    function validateInputs(e) {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (!username || !password) {
            setToastMessage(toastMessages[0]);  // message: please fill in all fields
            setShowToast('true');
        }
        // call handle submit if all inputs are filled
        else handleSubmit(username, password);
    }

    async function handleSubmit(username, password) {
        try {
            const userURL = user === 'L' ? 'lecturerlogin' : 'studentlogin';
            const response = await fetch(`${URL}/${userURL}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const data = await response.json();

            // if user = Lecturer, the lecturer's assigned courses are returned
            if (user === 'L') {
                const assignedCourses = data.assignedCourses;
                if (!assignedCourses) {
                    sessionStorage.setItem('assignedCourses', JSON.stringify(assignedCourses));
                    navigate('/lecturer');
                }
                else {  // invalid details
                    setToastMessage(toastMessages[1]);  // message: invalid id or password
                    setShowToast(true);
                }
            }
            // if user = Student, the student's 'indexNumber' and 'registeredCourses' are returned in 'studentData' object
            else {
                const studentData = data.studentData;
                if (!studentData) {
                    const indexNumber = studentData.indexNumber;
                    const registeredCourses = studentData.registeredCourses;
                    sessionStorage.setItem('indexNumber', indexNumber);
                    sessionStorage.setItem('registeredCourses', registeredCourses);
                    navigate('/student');
                }
                else {  // invalid details
                    setToastMessage(toastMessages[1]);  // message: invalid id or password
                    setShowToast(true);
                }
            }

        } catch (error) {
            console.log(error.message);
        }
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
                    App Name
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
                        {user === 'L' ? 'Lecturer Login' : 'Student Login'}
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