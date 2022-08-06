import React from "react"
import data from "./dummyDB";


export default function RandomGroup(){
    const [students, setStudents] = React.useState(data)
    return(
        <h1>HELLO WORLD</h1>
    )
}