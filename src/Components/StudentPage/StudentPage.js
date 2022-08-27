import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function StudentPage() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}