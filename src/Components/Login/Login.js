import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormLabel from 'react-bootstrap/FormLabel'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import './login.css'

import bgImage from './bg.png'
import { URL } from '../URL'    // server url

const toastMessages = ['Please fill in all fields', 'Invalid login credentials']

export default function Login() {
    // show or hide state: login modal
    const [showModal, setShowModal] = useState(false);
    // L = lecturer | S = Student. Default = L
    const [user, setUser] = useState('L');
    // show or hide state: toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showLoadingToast, setShowLoadingToast] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        // set current page value to 'C' to cause the floating nav to be hidden on Courses page.
        sessionStorage.setItem('currentPage', 'C');
    }, [])

    // check if all fields are filled in
    function validateInputs(e) {
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        let staff_id, staff_id_type_correct;
        if (user === 'L') {
            staff_id = document.querySelector('#staff_id').value;
        }
        if ((user === 'L' && (!username || !password || !staff_id)) ||
            (user === 'S' && (!username || !password))) {
            setToastMessage(toastMessages[0]);  // message: please fill in all fields
            setShowToast('true');
        }
        // call handle submit if all inputs are filled and are of valid types
        else {
            if (user === 'L')
                handleLecturerSubmit(e, username, password, staff_id);
            else
                handleStudentSubmit(e, username, password);
        }
    }

    async function handleLecturerSubmit(e, username, password, staff_id) {
        setShowLoadingToast(true);
        e.target.disabled = true;
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
            const lecturerData = data.lecturerData;
            setShowLoadingToast(false);
            e.target.disabled = false;

            if (lecturerData) {
                sessionStorage.setItem('username', JSON.stringify(lecturerData.username));
                sessionStorage.setItem('assignedCourses', JSON.stringify(lecturerData.assignedCourses));
                navigate('/lecturer/courses');
            }
            // invalid details
            else {
                setToastMessage(toastMessages[1]);  // message: invalid id or password
                setShowToast(true);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleStudentSubmit(e, username, password) {
        setShowLoadingToast(true);
        e.target.disabled = true;

        try {
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
            setShowLoadingToast(false);
            e.target.disabled = false;

            if (studentData) {
                sessionStorage.setItem('indexNumber', studentData.indexNumber);
                sessionStorage.setItem('username', studentData.username);
                sessionStorage.setItem('semester', studentData.semester);
                sessionStorage.setItem('year', studentData.year);
                sessionStorage.setItem('registeredCourses', JSON.stringify(studentData.registeredCourses));
                navigate('/student/courses');
            }
            else {  // invalid details
                setToastMessage(toastMessages[1]);  // message: invalid id or password
                setShowToast(true);
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
                            <Form.Control placeholder='username' id='username' />
                        </div>
                        <div className='field mb-2'>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Form.Control type='password' placeholder='password' id='password' />
                        </div>
                        {user === 'L' ?
                            <div className='field'>
                                <FormLabel htmlFor='staff_id'>Staff ID</FormLabel>
                                <Form.Control placeholder='Staff ID' id='staff_id' />
                            </div> : ''
                        }
                        <div>
                            <Button className='login_btn' onClick={(e) => validateInputs(e)}>Login</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* loading animation toast */}
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