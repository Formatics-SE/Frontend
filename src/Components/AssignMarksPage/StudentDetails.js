import React from "react"


export default function StudentsDetails(props){
    return(
        <tr>
            <td>{props.item.firstName} {props.item.lastName}</td>
            <td>{props.item.index}</td>
            <td>{props.item.mark}</td>
            <td><button className="Confirm-button" onClick={props.handleClick}>Confirm</button></td> 
        </tr>
    )
}