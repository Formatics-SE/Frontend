import React, { useState, useEffect } from "react"
import data from "../dummyDB"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import "./RandomGroup.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { URL } from "../../URL"

export default function RandomGroup(props) {
    const [numberOfStudentsPerGroup, setNumberOfStudentsPerGroup] = useState(props.value_prop)
    const [totalNumberOfStudents, setTotalNumberOfStudents] = useState(0)
    const [createdGroups, setCreatedGroups] = useState([])
    const [groupsSession, setGroupsSession] = useState({})
    const [showScores, setShowScores] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState([])
    const [scores, setScores] = useState(0)
    // const [groupsWithScores, setGroupsWithScores] = ([])

    const [showMessageToast, setShowMessageToast] = useState(false);
    const [showLoadingToast, setShowLoadingToast] = useState(false);
    const [message, setMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')

    // get groups data stroed in session
    let groups_session = JSON.parse(sessionStorage.getItem('groups'))
    useEffect(() => {
        setGroupsSession(groups_session)
    }, [])

    function handleChange(event) {
        let x = Number(event.target.value)
        // change the value of students per group only when the value is > 1 and <= half the total number of students
        if (x >= 2 && x <= (totalNumberOfStudents / 2)) {
            setNumberOfStudentsPerGroup(x)
        }
        else if (x < 2) {
            setNumberOfStudentsPerGroup(2)
        }
    }

    async function handleSubmitGroups(e) {
        const courseCode = sessionStorage.getItem('courseCode');
        setShowLoadingToast(true);
        e.target.disabled = true;

        try {
            const response = await fetch(`${URL}/updategroups`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    courseCode: courseCode,
                    groupsData: groupFormat
                })
            });

            const data = await response.json();
            e.target.disabled = false;
            setShowLoadingToast(false);

            if (data.info) {
                sessionStorage.setItem('groups', JSON.stringify(data.info))
                setGroupsSession(data.info)
                setMessage('Successfully applied updates !')
                setToastVariant('success')
                if (!showScores) {
                    setCreatedGroups(groupFormat)
                    setShowScores(true)
                }
            }
            else {
                setMessage('could not apply updates !')
                setToastVariant('danger')
            }
            setShowMessageToast(true);

        }
        catch (error) {
            console.log(error.message)
        }
    }
    // end handleSubmitGroups 

    async function handleSubmitScores(e) {
        const courseCode = sessionStorage.getItem('courseCode');
        setShowLoadingToast(true);
        e.target.disabled = true;

        try {
            const response = await fetch(`${URL}/groupsmarksupdate`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    courseCode: courseCode,
                    groupsData: createdGroups
                })
            });

            const data = await response.json();
            e.target.disabled = false;
            setShowLoadingToast(false);

            if (data.info) {
                sessionStorage.setItem('groups', JSON.stringify(data.info))
                setGroupsSession(data.info)
                setMessage('scores submitted successfully !')
                setToastVariant('success')
                if (!showScores) {
                    setCreatedGroups(groupFormat)
                    setShowScores(true)
                }
            }
            else {
                setMessage('could not apply updates !')
                setToastVariant('danger')
            }
            setShowMessageToast(true);

        }
        catch (error) {
            console.log(error.message)
        }
    }
    // end handleSubmitScores

    function handleScores() {
        setCreatedGroups(prev => {
            return prev.map(item => {
                let total = Number(item.score) + Number(scores)
                if (item.groupNumber === selectedGroup.groupNumber) {
                    return {
                        ...item,
                        score: total
                    }
                }
                else {
                    return item
                }
            })
        })
        setShowModal(false)
    }

    let GroupingsByCwa
    let GroupWithoutScores
    let groupFormat
    let GroupWithScores
    let groupNumberInModal

    let classList = groups_session?.registeredStudents
    let studentsPerGroup = Number(numberOfStudentsPerGroup)   //Number(props.value_prop)
    let division = Math.ceil(classList.length / studentsPerGroup)
    GroupingsByCwa = []   // container to hold the various groups
    let count = 0
    for (let i = 0; i < division; i++) {
        let newArray = []  //container to hold students in a group
        while (count < classList.length) {
            newArray.push(classList[count])
            count = count + division
        }
        GroupingsByCwa.push(newArray) // pushing a complete group to the main list
        count = i + 1
    }

    let number = 0
    groupFormat = GroupingsByCwa.map(item => {
        number = number + 1
        return {
            groupNumber: number,
            members: item.map(student => {
                return {
                    name: `${student.name}`,
                    indexNumber: student.indexNumber
                }
            }),
            score: 0
        }
    })

    // generate groups if no groups have been created
    if (groups_session?.groups?.length === 0 || groupsSession?.groups?.length === 0) {
        console.log('no groups available')

        GroupWithoutScores = groupFormat.map(item => {
            return (
                <Card className="cards-container">
                    <Card.Body className="cards-body">
                        <Card.Title className="cards-title-score">Group {item.groupNumber}</Card.Title>
                        <Card.Text className="members">
                            {item.members.map(student => {
                                return (
                                    <li key={student.indexNumber}>{student.name}: {student.indexNumber}</li>
                                )
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
    }
    else {
        groupFormat = groups_session?.groups;
        GroupWithScores = createdGroups.map(item => {
            return (
                <Card className="cards-container"
                    onClick={() => {
                        setSelectedGroup(item)
                        setShowModal(true)
                    }}
                >
                    <Card.Body className="cards-body">
                        <Card.Title className="cards-title-score">
                            <div>Group {item.groupNumber}</div>
                            <div>Score: {item.score}</div>
                        </Card.Title>
                        <Card.Text className="members">
                            {item.members.map(student => {
                                return (
                                    <li key={student.indexNumber}>{student.name}: {student.indexNumber}</li>
                                )
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        if (!showScores) {
            setCreatedGroups(groupFormat)
            setShowScores(true)
        }
    }
    // end else statement

    if (showModal) {
        groupNumberInModal = <div className="number-in-modal">Group {selectedGroup.groupNumber} marks: </div>
    }

    useEffect(() => {
        setTotalNumberOfStudents(classList.length)
    }, [classList])

    return (
        <section className="random-groups-container">
            <div className="heading-container">
                {
                    !showScores ?
                        <>
                            <div className="groupsof-and-groupsof-input">Groups of:
                            <Form.Control type="number"
                                    className="input-field" min={2}
                                    onChange={handleChange}
                                    value={numberOfStudentsPerGroup}
                                />
                            </div>
                            <div className="submit-button-div"><Button className="submit-button" onClick={(e) => handleSubmitGroups(e)}>Submit Groups</Button></div>
                        </> :
                        <>
                            <div className="assign-marks-label">Assign Marks to Groups</div>
                            <div className="submit-button-div"><Button className="submit-button-scores" onClick={(e) => handleSubmitScores(e)}>Submit Scores</Button></div>
                        </>
                }
            </div>
            {!showScores ?
                <div className="random-groups">
                    {GroupWithoutScores}
                </div> :
                <div className="random-groups">
                    {GroupWithScores}
                </div>
            }

            <Modal onHide={() => setShowModal(false)}
                show={showModal}
                backdrop='static'
                id='modal'
                className='group-marks-modal'
            >
                <Modal.Body>
                    <div id='modal_header'>
                        <span style={{ color: 'rgb(163, 23, 140)' }}>Assign Group Marks</span>
                        <Button id='close_btn' onClick={() => setShowModal(false)}>&times;</Button>
                    </div>
                    <hr />
                    <div>
                        <div className='assign-marks-div'>
                            {groupNumberInModal}
                            <Form.Control type="number" className="assign-marks-entry" onChange={(e) => setScores(e.target.value)} />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <Button
                            id='confirm_btn'
                            className='assign-marks-button'
                            onClick={handleScores}>
                            Confirm
                        </Button>
                    </div>
                    {/* {showModal ? <div className="group-members">{groupNumberInModal}</div> : <div>No group selected</div>} */}
                    <div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* message toast */}
            <Toast show={showMessageToast}
                onClose={() => setShowMessageToast(false)}
                bg={toastVariant}
                autohide
                delay={3000}
                className='toast-message'
            >
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>

            {/* loading toast */}
            <Toast show={showLoadingToast}
                onClose={() => setShowLoadingToast(false)}
                bg='secondary'
                autohide
                delay={3000}
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