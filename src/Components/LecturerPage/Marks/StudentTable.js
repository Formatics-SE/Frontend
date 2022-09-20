import React, { useState, useEffect } from "react";
import StudentsDetails from "./StudentDetails";
import data from "../dummyDB";
import "./StudentTable.css";
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

export default function StudentsTable() {

    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')

    const [students, setStudents] = useState([])
    const [match, setMatch] = useState('')

    const [individualMarksFieldValue, setIndividualMarksFieldValue] = useState(0)
    const [allMarksFieldValue, setAllMarksFieldValue] = useState(0)

    const [marks, setMarks] = useState({
        individual_marks: 0,
        group_marks: 0
    })
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('No match')

    let student_list = students.map((student, index) => {
        return (
            <StudentsDetails
                key={index}
                student={student}
            />
        )
    })

    // let student_list_filtered = students.filter(student => {
    //     let regexp = new RegExp(`${match}`)
    //     if (student.indexNumber.toString().search(regexp) != -1) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }).map((student, index) => {
    //     return (
    //         <StudentsDetails
    //             key={index}
    //             student={student}
    //         />
    //     )
    // })

    useEffect(() => {
        const marks_session = JSON.parse(sessionStorage.getItem('marks'));

        setCourseName(marks_session?.courseName)
        setCourseCode(marks_session?.courseCode)
        // setStudents(marks_session?.registeredStudents)

        setStudents(marks_session?.registeredStudents.map(student => {
            let totalMarks = 0;
            student.marksArray.map(marksObj => {
                totalMarks += marks;
            })
            return {
                name: student.name,
                indexNumber: student.indexNumber,
                currentDayMarks: 0,
                totalMarks: totalMarks
            }
        }))

    }, [])

    function handleSearch(event) {
        setMatch(event.target.value)
    }

    function handleAllStudentsMarks() {
        let inputMarks = Number(document.querySelector('.all_marks_field').value);
        setStudents(prev => {
            return prev.map(student => {
                student.currentDayMarks += inputMarks;
                student.totalMarks += inputMarks;
                return student;
            })
        })
        if (inputMarks === 0) {
            setShowToast(false)
        }
        else {
            setShowToast(true)
            setMessage(`Assigned ${inputMarks} to all students`)
        }
    }

    function handleIndividualMarks() {
        let studentName;
        let inputMarks = Number(document.querySelector('.individual_marks_field').value);
        let foundMatch = false;
        setStudents(prev => {
            return prev.map(student => {
                studentName = student.name;
                if (student.indexNumber.toString() === match && (Number(inputMarks) > 0)) {
                    foundMatch = true;
                    student.currentDayMarks += inputMarks;
                    student.totalMarks += inputMarks;
                    return student;
                }
                else {
                    foundMatch = false;
                    setMessage("No match found !")
                    setShowToast(true)
                    return student;
                }
            })
        })
        if (foundMatch) {
            setMessage(`Assigned ${inputMarks} to ${studentName}`);
        }
        else {
            setMessage("No match found !")
        }
        setShowToast(true)
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
                        type="number"
                        name="search_sname"
                        className="table-search"
                        value={match}
                        onChange={handleSearch} />
                </div>

                <div className="individual"><Form.Control type="number"
                    className="marks individual_marks_field"
                    id="individual"
                    name="individual_marks"
                    value={individualMarksFieldValue}
                    onChange={(e) => setIndividualMarksFieldValue(e.target.value)}
                />
                    <Button type="submit"
                        id="input_marks"
                        onClick={handleIndividualMarks}
                        className="confirm-individual">
                        Assign
                    </Button>
                </div>

                <div className="all-students">
                    <Form.Control type="number"
                        className="marks all_marks_field"
                        id="group"
                        name="group_marks"
                        value={allMarksFieldValue}
                        onChange={(e) => setAllMarksFieldValue(e.target.value)}
                    />
                    <Button type="submit"
                        id="input_marks"
                        onClick={handleAllStudentsMarks}
                        className="confirm-group">
                        Assign to all
                    </Button>
                </div>
                <div>
                    <Button type="submit"
                        id="input_marks"
                        onClick={handleSubmit}
                        className="submit-form">
                        Submit
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
                            {/* {student_list_filtered.length === 0 ?
                                student_list :
                                student_list_filtered
                            } */}
                        </tbody>
                    </Table>
                    {/* <Modal
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
                    </Modal> */}


                </div>
            </div>
            <Toast show={showToast}
                onClose={() => setShowToast(false)}
                bg='secondary'
                autohide
                delay={3000}
                className='toast-message'
            >
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>
        </section>
    )
}