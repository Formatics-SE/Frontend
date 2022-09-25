import React from "react"


export default function StudentsDetails(props){

    return(
        <tr>
            <td>{props.student.name}</td>
            <td id={props.student.indexNumber}>{props.student.indexNumber}</td>
            <td>{props.student.totalMarks}</td>
            <td id={props.student.groupScore}>{props.student.groupScore}</td>
            <td id={props.id}>{props.student.totalMarks + props.student.groupScore}</td>
        </tr>
    )
}