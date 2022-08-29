import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import './attendance.css'

import Row from './Row'
import Button from 'react-bootstrap/esm/Button'

export default function Attendance() {

    const [attendanceList, setAttendanceList] = useState([])

    // temp
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.max-strikes-input').value = 3;
    })
    // temp

    useEffect(() => {
        // const attendanceList_session = JSON.parse(sessionStorage.getItem('attendanceList'));
        const attendanceList_session = [
            {
                name: 'Joe Freizer',
                attendance: 0,
                strikes: 2
            },
            {
                name: 'Bill Coleman',
                attendance: 2,
                strikes: 0
            }
            // ,
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // },
            // {
            //     name: 'Bill Coleman',
            //     attendance: 2,
            //     strikes: 0
            // }
        ]
        setAttendanceList(
            attendanceList_session?.map((studentObj, index) => {
                return (
                    <Row key={index}
                        id={index}
                        name={studentObj.name}
                        attendance={studentObj.attendance}
                        strikes={studentObj.strikes}
                    />
                )
            })
        )
    }, [])

    return (
        <div className='attendance'>
            <div className='attendance-header'>
                <div className='max-strikes-div'>
                    Max Strikes:
                <Form.Control type='number' className='max-strikes-input' />
                </div>
                <Button className='submit-btn'>Submit</Button>
            </div>
            <div className='attendance-list'>
                <Table hover bordered className='table'>
                    <thead>
                        <tr>
                            <th>Students</th>
                            <th>Strikes</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendanceList
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
