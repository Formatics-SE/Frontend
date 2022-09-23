import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import './courses.css'

import bg1 from './compressed 1.jpg'
import bg2 from './compressed 2.jpg'
import Accordion from './Accordion'
import { URL } from '../../URL'

const Courses = () => {

  const [BG_Images, setBG_Images] = useState([bg1, bg2]);
  const [Courses, setCourses] = useState([]);
  const [showToast, setShowToast] = useState(false)   // toggle for toast used for a loading animation

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('currentPage', 'C');

    const courses_session = JSON.parse(sessionStorage.getItem('assignedCourses'));

    // keeps track of the background image to parse next to accordion
    let bg_index = -1;
    setCourses(courses_session.map((courseData, index) => {
      ++bg_index;
      if (bg_index === BG_Images.length) { bg_index = 0 }
      return (
        <Accordion key={index}
          id={index}
          courseCode={courseData.courseCode}
          courseName={courseData.courseName}
          year={courseData.year}
          semester={courseData.semester}
          credits={courseData.credits}
          bg={BG_Images[bg_index]}
          handleSubmit={handleSubmit}
        />
      )
    }));

    // localStorage.setItem('currentPage', 'C');


  }, []);

  // receives the path to the destination page from the clicked accordion 
  async function handleSubmit(path, courseCode) {
    let urlPath; // backend fetch url path
    setShowToast(true);
    switch (path) {
      case 'attendance':
        urlPath = 'fetchattendance'; break;
      case 'marks':
        urlPath = 'fetchlecturermarks'; break;
      case 'groups':
        urlPath = 'fetchlecturergroups'; break;
      case 'polls':
        urlPath = 'fetchpolls'; break;
    }

    try {
      const response = await fetch(`${URL}/${urlPath}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ courseCode: courseCode })
      })

      const data = await response.json();
      setShowToast(false);
      
      if (data.info) {
        // save the course code and course name in session
        sessionStorage.setItem('courseCode', data.info.courseCode);
        sessionStorage.setItem('courseName', data.info.courseName);
        // Switch between the value of path to determine the storage key for sessionStorage.
        // The value set by localStorage.setItem is retrieved by the floating nav component and highlights the approrpiate page as active.
        switch (path) {
          case 'attendance':
            sessionStorage.setItem('attendance', JSON.stringify(data?.info));
            localStorage.setItem('currentPage', 'R');
            navigate('/lecturer/rollcall');
            break;
          case 'marks':
            sessionStorage.setItem('marks', JSON.stringify(data?.info));
            localStorage.setItem('currentPage', 'M');
            navigate('/lecturer/marks');
            break;
          case 'groups':
            sessionStorage.setItem('groups', JSON.stringify(data?.info));
            localStorage.setItem('currentPage', 'G');
            navigate('/lecturer/groups');
            break;
          case 'polls':
            sessionStorage.setItem('polls', JSON.stringify(data?.info.polls));
            localStorage.setItem('currentPage', 'P');
            navigate('/lecturer/polls');
            break;
        }
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='courses'>
      <Toast show={showToast}
        onClose={() => setShowToast(false)}
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
      <div className='course_accordion_container'>
        {Courses}
      </div>
    </div>
  )
}


export default Courses;