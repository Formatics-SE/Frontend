import React from "react";
import StudentsDetails from "./StudentsDetails";
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

    

    return(
        <section>
            <div className="search-marks">
                <input type="search" placeholder="Search" name="search_sname" className="table-search"/>
                <div>
                    <label htmlFor="input_marks" className="label-for-marks">Enter marks here:</label>
                    <input type="number" id="input_marks"  name="input_marks" className="table-marks"/>
                </div>
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