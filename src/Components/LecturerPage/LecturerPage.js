import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function LecturerPage() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}