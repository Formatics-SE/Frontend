import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './accordion.css'

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
