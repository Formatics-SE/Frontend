import React from "react";
import StudentsDetails from "./StudentDetails";
import data from "./dummyDB";
import "./StudentTable.css";

export default function StudentsTable(){

    const students = data.map(item =>{
        return(
            <StudentsDetails
                key= {item.key}
                item ={item}
                
            />
        )
    })
    const [swit,setSwit] = React.useState(true)

    function handleSwitch(){
                setSwit(prev => !prev)
            }


    

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
                    <button type="number" id="input_marks"  name="input_marks" className="confirm-individual">Confirm</button>
                    :
                    <div className="all-students">
                        <input type="number" className="marks"/>
                        <button type="number" id="input_marks"  name="input_marks" className="confirm-individual">Confirm</button>
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
                        {students}
                    </tbody>
                </table>
            </div>
        </section>
    )
}