import React from "react";
import StudentsDetails from "./StudentDetails";
import data from "./dummyDB";
import "./StudentTable.css";
import Modal from 'react-bootstrap/Modal'
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

export default function StudentsTable(){
    const [students, setStudents] = React.useState(data)
    const [match,setMatch] = React.useState('')
    const [marks, setMarks] = React.useState({
        individual_marks: 0,
        group_marks : 0
    })
    const [showModal, setShowModal] = React.useState(false);
    const [specifiedStudent, setSpecifiedStudent] = React.useState('No match')

    let student_list = students.filter(val=>{
        if(match===""){
            return val
            }
        else if(val.index.includes(match)){
            return val
        }}).map(item=> {
                return(
                    <StudentsDetails 
                    key={item.id}
                    item ={item}
                    />
                )}
            
        )
    
    

    function handleSearch(event){
        setMatch(event.target.value)
    }
    function handleMarksEntry(event){
        setMarks(prev=>{
            return{
                ...prev,
                [event.target.name] : event.target.value
            }
        })

    }

    function handleAll(){
        setStudents(prev=>{
                return prev.map(student=>{
                    const total = Number(student.mark) + Number(marks.group_marks)
                    return{
                        ...student,
                        mark: total
                    }
                })
            })

        setShowModal(prev=>!prev)
        setSpecifiedStudent(`Assigned ${marks.group_marks} to all students`)
        setMarks(prev=>{
            return{
                ...prev,
                group_marks: 0
            }
        })
    }   
    
    function handleIndividual(){
        setStudents(prev=>{
            return prev.map(student=>{
                if(student.index === match){
                    setShowModal(prev=>!prev)
                    let total = Number(student.mark)
                    total = Number(student.mark) + Number(marks.individual_marks)
                    setSpecifiedStudent(`Assigned ${marks.individual_marks} to ${student.firstName} ${student.lastName}`)
                     return{
                        ...student,
                        mark: total
                        }
                    }
                else{
                    setShowModal(prev=>!prev)
                    return student
                }
            })
        })
        setSpecifiedStudent("Oops, no match!!!")
        setMatch("")
        // student_list = students.map(item=>{
        //     return(
        //         <StudentsDetails 
        //             key={item.id}
        //             item={item}
        //         />
        //     )
        // })
        setMarks(prev=>{
            return{
                ...prev,
                individual_marks: 0
            }
        })


    }

    return(
        <section>
            <div className="input-container">
               <div>
                    <input type="search" 
                           placeholder="Search with index numbers...." 
                           name="search_sname" 
                           className="table-search" 
                           value={match} 
                           onChange={handleSearch}/> 
                    <input type="number" 
                           className= "marks" 
                           id="individual" 
                           name="individual_marks"  
                           value={marks.individual_marks}
                           onChange ={handleMarksEntry}
                           />
                    <button type="submit"
                                id="input_marks"  
                                onClick={handleIndividual}
                                className="confirm-individual">
                                Assign
                    </button>

                </div>
                
                    
                 <div className="all-students">
                    <input type="number" 
                           className="marks" 
                            id="group"
                            name="group_marks" 
                            value={marks.group_marks} 
                            onChange ={handleMarksEntry}/>
                    <button type="submit"
                            id="input_marks" 
                            onClick={handleAll}
                            className="confirm-group">
                                Assign to all
                    </button>
                 </div>
            
            </div>
            <div className="main-container">
            <div className="table-container">
                <Table striped bordered hover size="sm" variant="secondary" responsive>
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
                    <Modal.Body className = "modal-body">
                        <div>{specifiedStudent}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  className="closeButton" onClick={() => setShowModal(prev=>!prev)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
        </section>
    )
}