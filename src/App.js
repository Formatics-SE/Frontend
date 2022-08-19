import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Components/Login/Login'

import LecturerPage from './Components/LecturerPage/LecturerPage'
import Attendance from './Components/LecturerPage/Attendance/Attendance'
import Courses from './Components/LecturerPage/Courses/Courses'
import Groups from './Components/LecturerPage/Groups/Groups'
import Poll from './Components/LecturerPage/Poll/Poll'
import Marks from './Components/LecturerPage/Marks/Marks'

import StudentPage from './Components/StudentPage/StudentPage'

import StudentsTable from "./Components/LecturerPage/StudentTable";
import RandomGroup from "./Components/LecturerPage/RandomGroup";

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/lecturer' element={<LecturerPage />}>
        <Route path='courses' element={<Courses />} />
        <Route path='groups' element={<Groups />} />
        <Route path='rollcall' element={<Attendance />} />
        <Route path='poll' element={<Poll />} />
        <Route path='marks' element={<Marks />} />
      </Route>
      <Route path='/student' element={<StudentPage />} />
    </Routes>

    // <Groups />

    // <RandomGroup />

  )
}
