import React from "react"


export default function StudentsDetails(props){

    return(
        <tr>
            <td>{props.item.firstName} {props.item.lastName}</td>
            <td id={props.item.index}>{props.item.index}</td>
            <td>{props.item.mark}</td>
        </tr>
    )
}