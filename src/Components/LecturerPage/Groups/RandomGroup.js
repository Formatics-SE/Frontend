import React, { useState, useEffect } from "react"
import data from "../dummyDB"
import "./RandomGroup.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import "bootstrap/dist/css/bootstrap.min.css"
import { ListGroupItem } from "react-bootstrap"

export default function RandomGroup(props) {
    const [numberOfStudents, setNumberOfStudents] = useState(props.value_prop)
    const [createdGroups, setCreatedGroups] = useState([])
    const [showScores, setShowScores] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState([])
    const [scores, setScores] = useState(0)
    // groups fetched from session storage
    //const [groups, setGroups] = useState([])

    const [showMessageToast, setShowMessageToast] = useState(false);
    const [showLoadingToast, setShowLoadingToast] = useState(false);
    const [message, setMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')


    function handleChange(event) {
        let x = Number(event.target.value)
        if (x >= 2) {
            setNumberOfStudents(x)
        }
        else {
            setNumberOfStudents(2)
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

                })
            });

            const data = await response.json();
            e.target.disabled = false;
            setShowLoadingToast(false);

            if (data.successful) {
                setMessage('Successfully applied updates !')
                setToastVariant('success')
            }
            else {
                setMessage('Could not apply updates !')
                setToastVariant('danger')
            }
            setShowMessageToast(true);


            // if (!showScores) {
            //     setCreatedGroups(groupFormat)
            //     setShowScores(true)
            // }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    function handleSubmitScores() {
        console.log(createdGroups)
        console.log("scores have been submitted successfully")
    }

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




    let randomGroupingsByCwa
    let randomGroupWithoutScores
    let groupFormat
    let randomGroupWithScores
    let groupListInModal
    // generate groups if the value of the 'noCreatedGroups' prop is false
    if (!props.noCreatedGroups) {
        let classList = data.map(studentData => {
            return studentData
        })
        let studentsPerGroup = Number(numberOfStudents)   //Number(props.value_prop)
        let division = Math.ceil(classList.length / studentsPerGroup)
        randomGroupingsByCwa = []   // container to hold the various groups
        let count = 0
        for (let i = 0; i < division; i++) {
            let newArray = []  //container to hold students in a group
            while (count < classList.length) {
                newArray.push(classList[count])
                count = count + division
            }
            randomGroupingsByCwa.push(newArray) // pushing a complete group to the main list
            count = i + 1
        }

        let number = 0
        groupFormat = randomGroupingsByCwa.map(item => {
            number = number + 1
            return {
                groupNumber: number,
                members: item.map(student => {
                    return {
                        name: `${student.firstName} ${student.lastName}`,
                        index: student.index,
                        cwa: student.cwa,
                    }
                }),
                score: 0
            }
        })


        randomGroupWithoutScores = groupFormat.map(item => {
            return (
                <Card className="cards-container">
                    <Card.Body className="cards-body">
                        <Card.Title className="cards-title-score">Group {item.groupNumber}</Card.Title>
                        <Card.Text className="members">
                            {item.members.map(student => {
                                return (
                                    <li key={student.index}>{student.name}: {student.index}</li>
                                )
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        randomGroupWithScores = createdGroups.map(item => {
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
                                    <li>{student.name}: {student.index}</li>
                                )
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

    }
    if (showModal) {
        groupListInModal = selectedGroup.members.map(member => {
            return (
                <li className="list-in-modal">{member.name}: {member.index}</li>
            )
        })
    }

    useEffect(() => {
        // if (!props.noCreatedGroups) {
        //     let groups_session = JSON.parse(sessionStorage.getItem('groups'))
        //     setGroups(prev => [...prev, 
        //         groups_session?.map(groupObj => {

        //         })
        //     ])
        // }

    }, [])

    return (
        <section className="random-groups-container">
            <div className="heading-container">
                {
                    !showScores ?
                        <>
                            <div className="groupsof-and-groupsof-input">Groups of:
                            <Form.Control type="number" className="input-field" min={2} onChange={handleChange} />
                            </div>
                            <div className="submit-button-div"><Button className="submit-button" onClick={handleSubmitGroups}>Submit Groups</Button></div>
                        </> :
                        <>
                            <div className="assign-marks-label">Assign Marks to Groups</div>
                            <div className="submit-button-div"><Button className="submit-button-scores" onClick={handleSubmitScores}>Submit Scores</Button></div>
                        </>
                }
            </div>
            {!showScores ?
                <div className="random-groups">
                    {randomGroupWithoutScores}
                </div> :
                <div className="random-groups">
                    {randomGroupWithScores}
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
                    <div>
                        <div className='assign-marks-div'>
                            <Form.Control type="number" className="assign-marks-entry" onChange={(e) => setScores(e.target.value)} />
                            <Button
                                className='assign-marks-button'
                                onClick={handleScores}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                    {showModal ? <div className="group-members">{groupListInModal}</div> : <div>No group selected</div>}
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
                onClose={() => setShowMessageToast(false)}
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