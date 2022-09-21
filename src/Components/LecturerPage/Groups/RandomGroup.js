import React, { useState, useEffect } from "react"
import data from "../dummyDB"
import "./RandomGroup.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import "bootstrap/dist/css/bootstrap.min.css"

export default function RandomGroup(props) {
    const [numberOfStudents, setNumberOfStudents] = useState(props.value_prop)
    const [groupsToBeSubmitted, setGroupsToBeSubmitted] = useState([])
    // groups fetched from session storage
    const [groups, setGroups] = useState([])

    function handleChange(event) {
        let x = Number(event.target.value)
        if(x>=2){
            setNumberOfStudents(x)
        }
        else{
            setNumberOfStudents(2)
        }
        
    }

    function handleSubmit() {
        setGroupsToBeSubmitted(randomGroupingsByCwa)
    }
    

    let randomGroupingsByCwa, random_group;
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
            randomGroupingsByCwa.push(newArray) // pushing a complete group to the main container
            count = i + 1
        }
        //console.log(randomGroupingsByCwa)
        let number = 0
        let groupFormat = randomGroupingsByCwa.map(item=>{
            number = number + 1
            return{
                groupNumber: number,
                members: item.map(student=>{
                    return {
                        name: `${student.firstName} ${student.lastName}`,
                        index: student.index,
                        cwa: student.cwa  }
                })
            }
        })

       console.log(groupFormat)

        random_group = groupFormat.map(item => {
            return (
                <Card className="cards-container">
                    <Card.Body className="cards-body">
                        <Card.Title className="cards-title">GROUP {item.groupNumber}</Card.Title>
                        <Card.Text>
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
            {/* <div className='course-info'>
                {props.courseCode}: {props.courseName}
            </div> */}
            <div className="heading-container">
                <div className="groupsof-and-groupsof-input">Groups of:
                    <Form.Control type="number" className="input-field"  min={2} onChange={handleChange} />
                </div>
                <div className="submit-button-div"><Button className="submit-button" onClick={handleSubmit}>Submit Groups</Button></div>
            </div>
            <div className="random-groups">
                {random_group}
            </div>
        </section>
    )
}