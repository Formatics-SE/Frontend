import React, { useEffect } from "react"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Components/Login/Login'

import LecturerPage from './Components/LecturerPage/LecturerPage'
import Attendance from './Components/LecturerPage/Attendance/Attendance'
import Courses from './Components/LecturerPage/Courses/Courses'
import Groups from './Components/LecturerPage/Groups/Groups'
import Poll from './Components/LecturerPage/Poll/Poll'

import StudentPage from './Components/StudentPage/StudentPage'

import StudentsTable from "./Components/LecturerPage/StudentTable";

export default function App() {

  return (
    // <Routes>
    //   <Route path='/' element={<Navigate to='/login' />} />
    //   <Route path='/login' element={<Login />} />
    //   <Route path='/lecturer' element={<LecturerPage />}>
    //     <Route path='courses' element={<Courses />} />
    //     <Route path='groups' element={<Groups />} />
    //     <Route path='attendance' element={<Attendance />} />
    //     <Route path='poll' element={<Poll />} />
    //   </Route>
    //   <Route path='/student' element={<StudentPage />} />
    // </Routes>

    <Groups />
  )
}
