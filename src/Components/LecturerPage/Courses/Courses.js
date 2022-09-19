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
    // const courses_session = JOSN.parse(sessionStorage.getItem('courses'));

    // temp
    const courses_session = [
      {
        courseCode: 'COE 354',
        courseName: 'Software Engineering',
        year: 3,
        semester: 2,
        credits: 4
      },
      {
        courseCode: 'COE 358',
        courseName: 'Operating Engineering',
        year: 3,
        semester: 2,
        credits: 3
      }
    ]

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
        urlPath = 'polls'; break;
    }

    try {
      const response = await fetch(`${URL}/${urlPath}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ courseCode: courseCode })
      })

      console.log('returned')

      const data = await response.json();
      setShowToast(false);
      if (data.info) {
        // switch between the value of path to determine the storage key for sessionStorage
        switch (path) {
          case 'attendance':
            console.log('atInfo: ', data.info)
            sessionStorage.setItem('attendanceInfo', JSON.stringify(data.info));
            navigate('/lecturer/rollcall');
            break;
          case 'marks':
            sessionStorage.setItem('marks', JSON.stringify(data?.info));
            navigate('/lecturer/marks');
            break;
          case 'groups':
            sessionStorage.setItem('groups', JSON.stringify(data?.groups));
            navigate('/lecturer/groups');
            break;
          case 'polls':
            sessionStorage.setItem('polls', JSON.stringify(data?.polls));
            navigate('/lecturer/polls');
            break;
          default:
            console.log('none of the above')
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