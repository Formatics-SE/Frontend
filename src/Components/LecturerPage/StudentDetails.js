import React from "react"


export default function StudentsDetails(props){


    function handleChange(event){
        [event.target.name] = event.target.value;
        
    }
    return(
        <tr>
            <td>{props.item.firstName} {props.item.lastName}</td>
            <td>{props.item.index}</td>
            <td>{props.item.mark}</td>
        </tr>
    )
}