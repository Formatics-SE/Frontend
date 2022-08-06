import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormLabel from 'react-bootstrap/FormLabel'
import Modal from 'react-bootstrap/Modal'
import './login.css'

import bgImage from './bg.png'

export default function Login() {

    const [showModal, setShowModal] = useState(false);
    // L = lecturer | S = Student. Default = L
    const [user, setUser] = useState('L');

    return (
        <div className='login_page'>
            <img src={bgImage} className='bg_img' />
            <div className='bg_img_shade'></div>

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
                className='login_modal'
            >
                <Modal.Body>
                    <div className='header'>
                        <Button className='close_btn' onClick={() => setShowModal(false)}>&times;</Button>
                        {user === 'L' ? 'Lecturer Login' : 'Student Login'}
                    </div>
                    <div>
                        <div className='field f1'>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Form.Control placeholder='Uzumaki Naruto' id='username' />
                        </div>
                        <div className='field'>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Form.Control type='password' placeholder='####' id='password' />
                        </div>
                        <div>
                            <Button className='login_btn'>Submit</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
