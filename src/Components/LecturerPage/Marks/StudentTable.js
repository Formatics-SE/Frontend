import React, { useState, useEffect } from "react";
import StudentsDetails from "./StudentDetails";
import "./StudentTable.css";
import Toast from 'react-bootstrap/Toast'
import Spinner from "react-bootstrap/Spinner"
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

import { URL } from "../../URL"

export default function StudentsTable() {

    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')

    const [students, setStudents] = useState([])
    const [groups, setGroups] = useState([])
    const [match, setMatch] = useState('')

    const [individualMarksFieldValue, setIndividualMarksFieldValue] = useState(0)
    const [allMarksFieldValue, setAllMarksFieldValue] = useState(0)

    const [showMessageToast, setShowMessageToast] = useState(false);
    const [showLoadingToast, setShowLoadingToast] = useState(false);
    const [message, setMessage] = useState('No match found !')
    const [toastVariant, setToastVariant] = useState('success')
    const [messageToastDelay, setMessageToastDelay] = useState(3000)

    let student_list = students?.map((student, index) => {
        return (
            <StudentsDetails
                key={index}
                id={index}
                student={student}
            />
        )
    })

    let student_list_filtered = students.filter(student => {
        if (student.indexNumber === parseInt(match)) {
            return true
        }
        else {
            return false
        }
    }).map((student, index) => {
        return (
            <StudentsDetails
                key={index}
                student={student}
            />
        )
    })

    useEffect(() => {
        async function fetchData() {
            setShowLoadingToast(true);
            let marks_session;
            try {
                const response = await fetch(`${URL}/fetchlecturermarks`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ courseCode: sessionStorage.getItem('courseCode') })
                });

                const data = await response.json();
                setShowLoadingToast(false);

                marks_session = data?.info;
                sessionStorage.setItem('marks', JSON.stringify(data?.info));
            }
            catch (error) {
                console.log(error.message)
            }
            // set the active page on the floating nav to the Marks page
            localStorage.setItem('currentPage', 'M');

            console.log('marks session groups: ', marks_session?.groups)

            setCourseName(marks_session?.courseName)
            setCourseCode(marks_session?.courseCode)
            setStudents(marks_session?.registeredStudents.map((student, index) => {
                let totalMarks = 0;
                // calculate the total marks in the marksArray : [{marks: ..., date: ...}]
                student.marksArray.map(marksObj => {
                    totalMarks += marksObj.marks;
                })
                console.log('total marks: ', totalMarks)


                let groupScore = 0;
                if (marks_session.groups.length != 0) {
                    for (let i = 0; i < marks_session?.groups?.length; i++) {
                        // console.log('student gn: ', student.groupNumber, 'ms number: ', marks_session?.groups[i].groupNumber)
                        if (student.groupNumber === marks_session?.groups[i].groupNumber) {
                            groupScore = marks_session?.groups[i].score;
                            break;
                        }
                    }
                }

                return {
                    key: { index },
                    name: student.name,
                    indexNumber: student.indexNumber,
                    currentDayMarks: 0,
                    totalMarks: totalMarks,
                    groupScore: groupScore
                }
            }))
            setGroups(marks_session?.groups);
            setMessage('Search for a student by index number and click ASSIGN. ASSIGN TO ALL allocates marks to every student.');
            setMessageToastDelay(8000);
            setShowMessageToast(true);
        }

        fetchData();

    }, [])

    function handleSearch(event) {
        let val = event.target.value;
        if (val.length <= 7) {
            setMatch(event.target.value)
        }
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
            setShowMessageToast(false)
        }
        else {
            setToastVariant('success')
            setMessage(`Assigned ${inputMarks} to all students`)
            setShowMessageToast(true)
        }
    }

    function handleIndividualMarks() {
        let studentName;
        let inputMarks = Number(document.querySelector('.individual_marks_field').value);
        setStudents(prev => {
            return prev.map(student => {
                if (student.indexNumber == match) {
                    studentName = student.name;
                    student.currentDayMarks += inputMarks;
                    student.totalMarks += inputMarks;
                    return student;
                }
                else {
                    return student;
                }
            })
        })

        if (inputMarks != 0 && student_list_filtered.length == 1) {
            setMessage(`Assignment successful !`);
            setToastVariant('success')
            setShowMessageToast(true)
        }
        else if (inputMarks == 0) return;
        else {
            setMessage("No match found !")
            setToastVariant('danger')
            setShowMessageToast(true)
        }
    }

    async function handleSubmit() {
        setShowLoadingToast(true);
        document.querySelector('.submit-form').disabled = true;
        try {
            const response = await fetch(`${URL}/updatemarks`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    courseCode: sessionStorage.getItem('courseCode'),
                    marksData: students
                })
            })

            const data = await response.json();
            setShowLoadingToast(false);
            document.querySelector('.submit-form').disabled = false;

            if (data.successful) {
                setMessage('Successfully applied updates !')
                setToastVariant('success')
            }
            else {
                setMessage('Could not apply updates !')
                setToastVariant('danger')
            }
            setShowMessageToast(true);

        } catch (error) {
            console.log(error.message)
        }
    }
    // end submit

    return (
        <section className='marks-page-container'>
            <div className='course-info'>
                {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
            </div>
            <div className="input-container">
                <div className="search">
                    <Form.Control
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
                                <th>Individual Score</th>
                                <th>Group Score</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {student_list} */}
                            {student_list_filtered.length === 0 ?
                                student_list :
                                student_list_filtered
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* toasts */}
            <Toast show={showMessageToast}
                onClose={() => setShowMessageToast(false)}
                bg={toastVariant}
                autohide
                delay={messageToastDelay}
                className='toast-message'
            >
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>

            <Toast show={showLoadingToast}
                onClose={() => setShowLoadingToast(false)}
                bg={toastVariant}
                className='loading_toast'
            >
                <Toast.Body>
                    <Spinner className='spinner'
                        animation='border'
                        size='md'
                    />
                </Toast.Body>
            </Toast>
        </section>
    )
}