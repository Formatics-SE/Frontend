import React from "react";
import StudentsDetails from "./StudentDetails";
import data from "./dummyDB";
import "./StudentTable.css";
import {Table, Button} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default function StudentsTable(){
    const [students, setStudents] = React.useState(data)
    
    const [match,setMatch] = React.useState('')
    const [swit, setSwit] = React.useState(true)

    function handleSearch(event){
        setMatch(event.target.value)
    }

    console.log(match)

    function handleClick(){
            // setStudents(prev=>{
            //     return prev.map(student=>{
            //         const point = document.getElementById(student.index).value
            //         const total = Number(point) + Number(student.mark)
            //         document.getElementById(student.index).value =0;
            //         return{
            //             ...student,
            //             mark: total
            //         }
            //     })
            // })
        
        
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
        
    
    const student_list = students.filter((val)=>{
        if(match === ""){
            return val
        }
        else if(val.firstName.toLowerCase().includes(match.toLowerCase()) || 
                val.lastName.toLowerCase().includes(match.toLowerCase())||
                val.index.toLowerCase().includes(match.toLowerCase())){
            return val
        }
    }

    ).map(item =>{
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
                    <input type="search" 
                           placeholder="Search" 
                           name="search_sname" 
                           className="table-search" 
                           value={match} 
                           onChange={handleSearch}/> 
                    <input type="number" className = "marks" id="individual" />
                    <button type="number"
                                id="input_marks" 
                                name="input_marks" 
                                //onClick={handleClick}
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
            </div>
            </div>
        </section>
    )
}