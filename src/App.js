import React, { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Components/Login/Login'
import LecturerPage from './Components/LecturerPage/LecturerPage'
import StudentPage from './Components/StudentPage/StudentPage'
import StudentsTable from "./Components/LecturerPage/StudentTable";

export default function App() {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/login');
  // }, [])

  return (
    // <Routes>
    //   <Route path='/login' element={<Login />} />
    //   <Route path='/lecturer' element={<LecturerPage />} />
    //   <Route path='/student' element={<StudentPage />} />
    // </Routes>
    <StudentsTable />
  )
}
