import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Components/Login/Login'

import LecturerPage from './Components/LecturerPage/LecturerPage'
// all pages to be routed in lecturer page
import Attendance from './Components/LecturerPage/Attendance/Attendance'
import Courses_L from './Components/LecturerPage/Courses/Courses'
import Groups_L from './Components/LecturerPage/Groups/Groups'
import Polls_L from './Components/LecturerPage/Polls/Polls'
import Marks_L from './Components/LecturerPage/Marks/Marks'
// end

import StudentPage from './Components/StudentPage/StudentPage'
// all pages to be routed in student page
import Courses from './Components/StudentPage/Courses/Courses'
import Groups from './Components/StudentPage/Groups/Groups'
import Polls from './Components/StudentPage/Polls/Polls'
import Marks from './Components/StudentPage/Marks/Marks'
// end

//temporary imports
// import StudentsTable from "./Components/LecturerPage/StudentTable";
// import RandomGroup from "./Components/LecturerPage/Groups/RandomGroup";
// end

import FloatingNav_Lect from './Components/FloatingNav_Lect/FloatingNav_Lect';
import FloatingNav_Stud from './Components/FloatingNav_Stud/FloatingNav_Stud';

export default function App() {

  return (
     <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/lecturer' element={[<LecturerPage />, <FloatingNav_Lect />]}>
        <Route path='courses' element={<Courses_L />} />
        <Route path='groups' element={<Groups_L />} />
        <Route path='marks' element={<Marks_L />} />
        <Route path='polls' element={<Polls_L />} />
        <Route path='rollcall' element={<Attendance />} />
      </Route>
      <Route path='/student' element={<StudentPage />}>
        <Route path='courses' element={<Courses />} />
        <Route path='groups' element={<Groups />} />
        <Route path='marks' element={<Marks />} />
        <Route path='polls' element={<Polls />} />
      </Route>
    </Routes> 

    //<Groups /> 

    //<RandomGroup /> 
  )
}
