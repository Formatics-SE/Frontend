import React from "react";
import StudentsDetails from "./StudentDetails";
import data from "./dummyDB";
import "./StudentTable.css";
import {Table, Button} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default function StudentsTable(){
    const [students, setStudents] = React.useState(data)
    const [match,setMatch] = React.useState('')
    const [marks, setMarks] = React.useState({
        individual_marks: 0,
        group_marks : 0
    })

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

    function demo(){
        const demo_list = students.filter((val)=>{
        if(match === ""){
            return val
        }
        else if(val.index.includes(match)){
            return val
        }
        }).map(item =>{
        return(
            <StudentsDetails
                key= {item.id}
                item ={item}
            />
        )
         }) 
         return demo_list
        }
    
        let student_list = demo()


    function handleIndividual(){

            setStudents(prev=>{
                return prev.map(student=>{
                    if(student.index.includes(match)){
                        const total = Number(student.mark) + Number(marks.individual_marks)
                        return {
                            ...student,
                            mark: total
                        }
                    }
                    
                })})
                

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
        setMarks(prev=>{
            return{
                ...prev,
                group_marks: 0
            }
        })
    }   
    
    console.log(marks)

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
            </div>
            </div>
        </section>
    )
}