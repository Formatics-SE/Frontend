import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Components/Login/Login'

import LecturerPage from './Components/LecturerPage/LecturerPage'
// all pages to be routed in lecturer page
import Attendance from './Components/LecturerPage/Attendance/Attendance'
import CoursesL from './Components/LecturerPage/Courses/Courses'
import GroupsL from './Components/LecturerPage/Groups/Groups'
import PollsL from './Components/LecturerPage/Polls/Polls'
import MarksL from './Components/LecturerPage/Marks/StudentTable'
// end

import StudentPage from './Components/StudentPage/StudentPage'
// all pages to be routed in student page
import Courses from './Components/StudentPage/Courses/Courses'
import Groups from './Components/StudentPage/Groups/Groups'
import Polls from './Components/StudentPage/Polls/Polls'
import Marks from './Components/StudentPage/Marks/Marks'
// end

import FloatingNavLect from './Components/FloatingNav_Lect/FloatingNav_Lect';
import FloatingNavStud from './Components/FloatingNav_Stud/FloatingNav_Stud';

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/lecturer' element={[<LecturerPage />, <FloatingNavLect />]}>
        <Route path='courses' element={<CoursesL />} />
        <Route path='groups' element={<GroupsL />} />
        <Route path='marks' element={<MarksL />} />
        <Route path='polls' element={<PollsL />} />
        <Route path='rollcall' element={<Attendance />} />
      </Route>
      <Route path='/student' element={[<StudentPage />, <FloatingNavStud />]}>
        <Route path='courses' element={<Courses />} />
        <Route path='group' element={<Groups />} />
        <Route path='marks' element={<Marks />} />
        <Route path='polls' element={<Polls />} />
      </Route>
      <Route path='/*' element={<Navigate replace to='/login' />} />
    </Routes>
  )
}
