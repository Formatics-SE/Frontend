import React, { useState, useEffect } from "react";
import StudentsDetails from "./StudentDetails";
import data from "../dummyDB";
import "./StudentTable.css";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

export default function StudentsTable() {

    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')

    const [students, setStudents] = useState(data)
    const [match, setMatch] = useState('')
    const [marks, setMarks] = useState({
        individual_marks: 0,
        group_marks: 0
    })
    const [showModal, setShowModal] = useState(false);
    const [specifiedStudent, setSpecifiedStudent] = useState('No match')

    let student_list = students.filter(val => {
        if (match === "") {
            return val
        }
        else if (val.index.includes(match)) {
            return val
        }
    }).map(item => {
        return (
            <StudentsDetails
                key={item.id}
                item={item}
            />
        )
    })

    // useEffect(() => {
    //     const attendanceInfo_session = JSON.parse(sessionStorage.getItem('attendanceInfo'));
    //     const students = attendanceInfo_session?.registeredStudents;

    //     setCourseName(attendanceInfo_session?.courseName)
    //     setCourseCode(attendanceInfo_session?.courseCode)

    // }, [])



    function handleSearch(event) {
        setMatch(event.target.value)
    }
    function handleMarksEntry(event) {
        setMarks(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })

    }

    function handleAllStudentsMarks() {
        setStudents(prev => {
            return prev.map(student => {
                const total = Number(student.mark) + Number(marks.group_marks)
                return {
                    ...student,
                    mark: total
                }
            })
        })

        setShowModal(prev => !prev)
        setSpecifiedStudent(`Assigned ${marks.group_marks} to all students`)
        setMarks(prev => {
            return {
                ...prev,
                group_marks: 0
            }
        })
    }

    function handleIndividualMarks() {
        setStudents(prev => {
            return prev.map(student => {
                if (student.index === match) {
                    setShowModal(prev => !prev)
                    let total = Number(student.mark)
                    total = Number(student.mark) + Number(marks.individual_marks)
                    setSpecifiedStudent(`Assigned ${marks.individual_marks} to ${student.firstName} ${student.lastName}`)
                    return {
                        ...student,
                        mark: total
                    }
                }
                else {
                    setShowModal(prev => !prev)
                    return student
                }
            })
        })
        setSpecifiedStudent("Oops, no match!!!")
        setMatch("")
        setMarks(prev => {
            return {
                ...prev,
                individual_marks: 0
            }
        })


    }

    return (
        <section className='marks-page-container'>
            <div className='course-info'>
                {courseCode}: {courseName}
            </div>
            <div className="input-container">
                <div className="search">
                    <Form.Control type="search"
                        placeholder="Search by index number"
                        name="search_sname"
                        className="table-search"
                        value={match}
                        onChange={handleSearch} />
                </div>

                <div className="individual"><Form.Control type="number"
                    className="marks"
                    id="individual"
                    name="individual_marks"
                    value={marks.individual_marks}
                    onChange={handleMarksEntry} />
                    <Button type="submit"
                        id="input_marks"
                        onClick={handleIndividualMarks}
                        className="confirm-individual">
                        Assign
                    </Button>
                </div>

                <div className="all-students">
                    <Form.Control type="number"
                        className="marks"
                        id="group"
                        name="group_marks"
                        value={marks.group_marks}
                        onChange={handleMarksEntry} />
                    <Button type="submit"
                        id="input_marks"
                        onClick={handleAllStudentsMarks}
                        className="confirm-group">
                        Assign to all
                    </Button>
                </div>
            </div>

            <div className="main-container">
                <div className="table-container">
                    <Table striped hover bordered size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Index Number</th>
                                <th>Accumulated marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student_list}
                        </tbody>
                    </Table>
                    <Modal
                        onHide={() => setShowModal(false)}
                        show={showModal}
                        backdrop='static'
                        className='modal-main-container' >
                        <Modal.Header closeButton>
                            <Modal.Title className="modal-title">Confirm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="my-modal-body">
                            <div>{specifiedStudent}</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="closeButton" onClick={() => setShowModal(prev => !prev)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </section>
    )
}