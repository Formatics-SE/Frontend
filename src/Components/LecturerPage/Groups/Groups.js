import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Group.css";

import FloatingNav from '../../FloatingNav_Lect/FloatingNav_Lect'

export default function Groups() {

  const [showModal, setShowModal] = useState(false);

  const [value, setValue] = React.useState(0);

  function inputGroupsOf (event) {
    setValue(event.target.value ? Number(event.target.value) : event.target.value) }
  

  return (
    <div className="noCoursePage">
      <section className="bodyContent">
        <div>
          <h4>No groups have been created for this course</h4>
        </div>
        <Button onClick={() => setShowModal(true)} className='modal_toggle_btn'>Create Groups</Button>
      </section>

      {/* modal to take group input*/}
      <Modal onHide={() => setShowModal(false)}
        show={showModal}
        backdrop='static'
        id='modal'
      >
        <Modal.Body>
          <div id='modal_header'>
            <Button id='close_btn' onClick={() => setShowModal(false)}>&times;</Button>
            CREATE GROUPS
          </div>
          <div>
            <div id='field'>
              <FormLabel htmlFor='input' >Create groups of:</FormLabel>
              <Form.Control type='number' id='input' value={value && Math.max(0,value)} onChange={inputGroupsOf} 
              />

            </div>
            <div>
              <Button id='confirm_btn'>Continue</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <footer className="footer">
        <div className="inner-footer">
          <div className="options">
            <ul className="links">
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Terms & Conditions Apply</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="outer-footer">
          Copyright &copy; 2022 Formatics. All rights reserved
        </div>
      </footer>
      

      <FloatingNav />

    </div>
  );

}
