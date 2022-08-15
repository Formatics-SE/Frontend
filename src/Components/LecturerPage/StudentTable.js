import React from "react";
import StudentsDetails from "./StudentDetails";
import data from "./dummyDB";
import "./StudentTable.css";
import {Table} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default function StudentsTable(){
    const [students, setStudents] = React.useState(data)
    
    const [swit,setSwit] = React.useState(true)


    function handleClick(){
        if(!swit){
            setStudents(prev=>{
                return prev.map(student=>{
                    const point = document.getElementById(student.index).value
                    const total = Number(point) + Number(student.mark)
                    document.getElementById(student.index).value =0;
                    return{
                        ...student,
                        mark: total
                    }
                })
            })
        }
        else{
            setStudents(prev=>{
                return prev.map(student=>{
                    const point = document.getElementById("group").value
                    const total = Number(student.mark) + Number(point)
                    return{
                        ...student,
                        mark: total
                    }
                })
            })
        }
        
    }
    const student_list = students.map(item =>{
        return(
            <StudentsDetails
                key= {item.id}
                item ={item}
            />
        )
    })

    

    return(
        <section>
            <div className="input-container">
               <div>
                    <input type="search" placeholder="Search" name="search_sname" className="table-search"/> 
                    <input type="number" className = "marks" id="individual" />
                    <button type="number"
                                id="input_marks" 
                                name="input_marks" 
                                onClick={handleClick}
                                className="confirm-individual">
                                Assign
                    </button>

                </div>
                
                    
                 <div className="all-students">
                    <input type="number" className="marks" id="group"/>
                    <button type="number"
                            id="input_marks" 
                            name="input_marks" 
                            onClick={handleClick}
                            className="confirm-group">
                                Assign to all
                    </button>
                 </div>
            
            </div>
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
            </div>
        </section>
    )
}