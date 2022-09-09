import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './courses.css'

import bg1 from './compressed 1.jpg'
import bg2 from './compressed 2.jpg'
import Accordion from './Accordion'
import URL from '../../URL'

const Courses = () => {

  const [BG_Images, setBG_Images] = useState([bg1, bg2]);
  const [Courses, setCourses] = useState([]);

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
      if (bg_index == BG_Images.length) { bg_index = 0 }
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
    let urlPath;
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
        body: { "courseCode": courseCode }
      })

      const data = await response.json();
      if (data) {
        // switch between the value of path to determine the key of the received json object
        switch (path) {
          case 'attendance' || 'marks':
            sessionStorage.setItem('registeredStudents', data?.registeredStudents);
            navigate(path === 'attendance' ? '/lecturer/rollcall' : '/lecturer/marks');
            break;
          case 'groups':
            sessionStorage.setItem('groups', data?.groups);
            navigate('/lecturer/groups');
            break;
          case 'polls':
            sessionStorage.setItem('polls', data?.polls);
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
      <div className='course_accordion_container'>
        {Courses}
      </div>
    </div>
  )
}


export default Courses;