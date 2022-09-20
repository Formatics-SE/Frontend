import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Group.css";

import RandomGroup from './RandomGroup'
import FloatingNav from '../../FloatingNav_Lect/FloatingNav_Lect'
import { URL } from '../../URL'

export default function Groups() {

  const [showModal, setShowModal] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  const [noCreatedGroups, setNoCreatedGroups] = useState(true);

  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')

  const [value, setValue] = React.useState(2);

  function checkInputGroupsOf(event) {
    setValue(event.target.value ? Number(event.target.value) : event.target.value)
  }

  useEffect(async () => {
    let groups_session = JSON.parse(sessionStorage.getItem('groups'))
    console.log('groups_session: ', groups_session)
    if (!groups_session) {
      setShowLoadingToast(true);
      try {
        const response = await fetch(`${URL}/fetchlecturergroups`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ courseCode: sessionStorage.getItem('courseCode') })
        });

        const data = await response.json();
        setShowLoadingToast(false);

        groups_session = data?.info;
        // save the fetched data in session
        sessionStorage.setItem('groups', JSON.stringify(data?.info));
      }
      catch (error) {
        console.log(error.message)
      }
    }
    // // make sure the active page on  the floating nav is the Attendance page
    localStorage.setItem('currentPage', 'G');

    // // display no groups page if there are no groups created for this course
    if (groups_session?.groups?.length === 0) {
      console.log('no groups')
      setNoCreatedGroups(true);
    }
    else {
      console.log('groups')
      setNoCreatedGroups(false);
    }

    setCourseName(groups_session?.courseName)
    setCourseCode(groups_session?.courseCode)

  }, [])
  // end useEffect

  return (
    <div className="groupsPage">
      <div className='course-info'>
        {courseCode}: {courseName}
      </div>
      {
        noCreatedGroups ?
          <section className="noGroups">
            <div>No groups have been created for this course</div>
            <Button onClick={() => setShowModal(true)} className='modal_toggle_btn'>Create Groups</Button>
          </section> :
          <div className='groups_container'>
            <RandomGroup
              value_prop={value}
              noCreatedGroups={noCreatedGroups}
            />
          </div>
      }

      {/* modal to take group input*/}
      <Modal onHide={() => setShowModal(false)}
        show={showModal}
        backdrop='static'
        id='modal'
      >
        <Modal.Body>
          <div id='modal_header'>
            <Button id='close_btn' onClick={() => setShowModal(false)}>&times;</Button>
            <span style={{ color: 'rgb(163, 23, 140)' }}>Create Groups</span>
          </div>
          <hr />
          <div>
            <div id='field'>
              <FormLabel htmlFor='input'>Create groups of:</FormLabel>
              <Form.Control type='number' id='input' value={value && Math.max(2, value)} onChange={checkInputGroupsOf} />
            </div>
            <hr></hr>
            <div>
              <Button id='confirm_btn'
                onClick={() => { setValue(document.querySelector('#input').value); setShowModal(false); setNoCreatedGroups(false) }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <footer className="footer">
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
      </footer> */}
    </div>
  );

}
