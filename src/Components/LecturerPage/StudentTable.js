import React from "react";
import StudentsDetails from "./StudentDetails";
import data from "./dummyDB";
import "./StudentTable.css";

export default function StudentsTable(){
    const [students, setStudents] = React.useState(data)
    
    const [swit,setSwit] = React.useState(true)
    console.log(swit)

    function handleSwitch(){
                setSwit(prev => !prev)
            }
    function handleClick(){
        if(swit){
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
                key= {item.key}
                item ={item}
                show ={swit}
                
            />
        )
    })

    

    return(
        <section>
            <div className="search-marks">
            <div>
                <input type="search" placeholder="Search" name="search_sname" className="table-search"/> 
            </div>
                <div>
                    {swit?
                        <button type="number" id="input_marks"  name="input_marks" className="confirm-group" onClick={handleSwitch}>
                            Switch to All students
                        </button>:
                        <button type="number" id="input_marks"  name="input_marks" className="confirm-group" onClick={handleSwitch}>
                            Switch to Individual
                        </button>

                        }
                </div>
                {swit?
                    <button type="number"
                             id="input_marks" 
                             name="input_marks" 
                             onClick={handleClick}
                             className="confirm-individual">
                             Confirm
                    </button>
                    :
                    <div className="all-students">
                        <input type="number" className="marks" id="group"/>
                        <button type="number"
                                id="input_marks" 
                                name="input_marks" 
                                onClick={handleClick}
                                className="confirm-individual">
                                Confirm
                        </button>
                    </div>
                }
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Index Number</th>
                            <th>Accumulated marks</th>
                            <th>Add/Sub</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student_list}
                    </tbody>
                </table>
            </div>
        </section>
    )
}