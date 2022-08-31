import React, { useEffect } from 'react'
import './polls.css'

export default function Polls() {

    useEffect(() => {

    }, [])

    return (
        <div className='student_polls'>
            <div className='pending_polls'>
                <div className='pending_polls_title'>
                    Pending Polls
                </div>
                <div className='pending_polls_body'>
                    
                </div>
            </div>
            <div className='participated_polls'>
                <div className='participated_polls_title'>
                    Participated Polls
                </div>
                <div className='participated_polls_body'>
                    
                </div>
            </div>
        </div>
    )
}
