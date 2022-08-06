import React from "react"
import data from "./dummyDB"
import "./RandomGroup.css"


export default function RandomGroup(){
    const [students, setStudents] = React.useState(data)

    const [value, setValue] = React.useState({
        division: "",
        view: ""

    })
    function ShuffleList(list){   // a function to shuffle the list for random grouping
        for(let i=list.length-1;i>0;i--){
            let randomNumber = Math.floor(Math.random()*(i+1))
            let temp = list[i]
            list[i] = list[randomNumber]
            list[randomNumber] = temp
        }
        
        
        
    }
    function handleClick(){
        let classList = []
        setStudents(prev=>{
            return prev.map(student=>{
                classList.push(`${student.firstName} ${student.lastName}`)
                return student
            })
        })
        ShuffleList(students)
        console.log(classList)
        
        

    }
    
    function handleChange(event){
        const {name, value}= event.target
        setValue(prev=>{
            return{
                ...prev,
                [name]:value 
            }
        })
    }

    const student_list = students.map(student=>{
        return(
            <li>{`${student.firstName} ${student.lastName}`}</li>
    )
    })
    
    
    return(
        <section>
            <div className="container-outer">    
                <div className="container-inner">
                    <label htmlFor="division" className="label">GROUPS OF:</label>
                    <input type="number" id="division" name="division" className="division-box" min={2} max={10} onChange={handleChange}/>
                    <div className="view-list-group">
                            <span><input 
                                    type="radio" 
                                    className="class-list" 
                                    name="view"  
                                    value="List"
                                    onChange={handleChange}/> 
                                    view class List 
                            </span> 

                            <span><input 
                                    type="radio" 
                                    className="class-list"
                                    name="view" 
                                    value="Random"
                                    onChange={handleChange}/>
                                    view random groups 
                            </span>
                    </div>
                </div>
                <input type="submit" className="submit-button" placeholder="Submit" onClick={handleClick}/>
            </div>
            <div className="container-list-random">
             <ol>
                {student_list}
             </ol>
            </div>
    </section>
    )
}