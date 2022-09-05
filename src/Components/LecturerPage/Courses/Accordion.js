import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './accordion.css';

function Accordion ({courseCode, courseName, year, semester})
{
  return(
    <div className='accordion'>
        <div className='img'>
            <div className='img-overlay'></div>
            <div className='course-code'>{courseCode}</div>
        </div>
        <div className='dropdown'>
            <span>{year}</span>
            <span>{semester}</span>
        </div>
    </div>
    
  )
}


export default Accordion;
