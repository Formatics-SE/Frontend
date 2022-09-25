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
  const [showToast, setShowToast] = useState(false)   // toast for a loading animation

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('currentPage', 'C');

    const courses_session = JSON.parse(sessionStorage.getItem('registeredCourses'));

    // keeps track of the background image to parse next to accordion
    let bg_index = -1;
    setCourses(courses_session?.map((courseData, index) => {
      ++bg_index;
      if (bg_index === BG_Images.length) { bg_index = 0 }
      return (
        <Accordion key={index}
          id={index}
          courseCode={courseData.courseCode}
          courseName={courseData.courseName}
          year={sessionStorage.getItem('year')}
          semester={sessionStorage.getItem('semester')}
          credits={courseData.credits}
          bg={BG_Images[bg_index]}
          handleSubmit={handleSubmit}
        />
      )
    }));

  }, []);

  // receives the path to the destination page from the clicked accordion 
  async function handleSubmit(path, courseCode) {
    let urlPath; // backend fetch url path
    setShowToast(true);
    switch (path) {
      case 'marks':
        urlPath = 'fetchstudentmarks'; break;
      case 'groups':
        urlPath = 'fetchstudentgroup'; break;
      case 'polls':
        urlPath = 'fetchpolls'; break;
    }

    const indexNumber = sessionStorage.getItem('indexNumber');
    console.log('index: ', indexNumber, 'code: ', courseCode)
    try {
      const response = await fetch(`${URL}/${urlPath}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          courseCode: courseCode,
          indexNumber: indexNumber
        })
      })

      const data = await response.json();
      setShowToast(false);

      if (data.info) {
        sessionStorage.setItem('courseCode', data.info.courseCode);
        sessionStorage.setItem('courseName', data.info.courseName);
        // switch between the value of path to determine the storage key for sessionStorage
        switch (path) {
          case 'marks':
            // sessionStorage.setItem('marks', JSON.stringify(data?.info));
            localStorage.setItem('currentPage', 'M');
            navigate('/student/marks');
            break;
          case 'groups':
            // sessionStorage.setItem('group', JSON.stringify(data?.group));
            localStorage.setItem('currentPage', 'G');
            navigate('/student/groups');
            break;
          case 'polls':
            // sessionStorage.setItem('polls', JSON.stringify(data?.polls));
            localStorage.setItem('currentPage', 'P');
            navigate('/student/polls');
            break;
        }
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='courses'>
      <div className='course_accordion_container'>
        {Courses}
      </div>
 
      {/* loading toast */}
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
    </div>
  )
}


export default Courses;