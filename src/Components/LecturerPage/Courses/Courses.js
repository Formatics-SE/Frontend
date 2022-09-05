import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Courses.css';

import bg1 from './compressed 1.jpg';
import bg2 from './compressed 2.jpg';
import Accordion from './Accordion';

const Courses = () => {

  const [BG_Images, setBG_Images] = useState([bg1, bg2]);
  const [Courses, setCourses] = useState([]);

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
        />
      )
    }));





  }, [])

  return (
    <div className='courses'>
      <div className='course_accordion_container'>
        {Courses}
      </div>
    </div>
  )
}


export default Courses;