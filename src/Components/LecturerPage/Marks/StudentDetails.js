import React from "react"


export default function StudentsDetails(props){

    return(
        <tr>
            <td>{props.student.name}</td>
            <td id={props.student.indexNumber}>{props.student.indexNumber}</td>
            <td>{props.student.totalMarks}</td>
        </tr>
    )
}