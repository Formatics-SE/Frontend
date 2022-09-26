import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function StudentPage() {
    const [username, setUsername] = useState('')

    useEffect(() => {
        setUsername(sessionStorage.getItem('username'))
    }, [])

    return (
        <div>
            <Header username={username} />
            <Outlet />
        </div>
    )
}