import React from "react"
import data from "../dummyDB"
import "./RandomGroup.css"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import "bootstrap/dist/css/bootstrap.min.css"

export default function RandomGroup(props) {
    const [numberOfStudents, setNumberOfStudents] = React.useState(props.value_prop)
    const [groupsToBeSubmitted, setGroupsToBeSubmitted] = React.useState([])


    function handleChange(event) {
        let x = Number(event.target.value)
        setNumberOfStudents(x)
    }
    function handleSubmit() {
        setGroupsToBeSubmitted(randomGroupingsByCwa)
    }
    console.log(groupsToBeSubmitted)

    let classList = data.map(student => {
        return `${student.firstName} ${student.lastName}: ${student.cwa}`
    })
    let studentsPerGroup = Number(numberOfStudents)   //Number(props.value_prop)
    let division = Math.ceil(classList.length / studentsPerGroup)
    let randomGroupingsByCwa = []   // container to hold the various groups
    let count = 0
    for (let i = 0; i < division; i++) {
        let newArray = []  //container to hold students in a group
        while (count < classList.length) {
            newArray.push(classList[count])
            count = count + division
        }
        randomGroupingsByCwa.push(newArray) // pushing a complete group to the main container
        count = i + 1
    }



    let random_group = randomGroupingsByCwa.map(item => {
        return (
            <Card className="cards-container">
                <Card.Body className="cards-body">
                    <Card.Title className="cards-title">GROUP {randomGroupingsByCwa.indexOf(item) + 1}</Card.Title>
                    <Card.Text>
                        {item.map((student, index) => {
                            return (
                                <li key={index}>{student}</li>
                            )
                        })}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    )

    return (
        <section className="random-groups-container">
            <div className='course-info'>
                {props.courseCode}: {props.courseName}
            </div>
            <div className="heading-container">
                <div className="groupsof-and-groupsof-input">Groups of:
                    <Form.Control type="number" className="input-field" min={2} onChange={handleChange} />
                </div>
                <div className="submit-button-div"><Button className="submit-button" onClick={handleSubmit} data-attr="Submit">Submit Groups</Button></div>
            </div>
            <div className="random-groups">
                {random_group}
            </div>
        </section>
    )
}