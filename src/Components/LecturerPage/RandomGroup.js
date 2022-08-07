import React from "react"
import data from "./dummyDB"
import "./RandomGroup.css"


export default function RandomGroup(){
    const students = data;

    const [value, setValue] = React.useState({
        division: "",
        view: ""

    })
    function handleChange(event){
        const {name, value}= event.target
        setValue(prev=>{
            return{
                ...prev,
                [name]:value 
            }
        })
    }


    
    function ShuffleList(list){   // a function to shuffle the list for random grouping
        for(let i=list.length-1;i>0;i--){
            let randomNumber = Math.floor(Math.random()*(i+1))
            let temp = list[i]
            list[i] = list[randomNumber]
            list[randomNumber] = temp
        }
        
        
        
    }
    function handleClick(){
        let classList = students.map(student=>{
            return `${student.firstName} ${student.lastName}`
        })
        ShuffleList(classList)
         let studentsPerGroup = Number(value.division)
         let randomGroups = []
         for(let i=0; i<classList.length;i= i + studentsPerGroup){
            randomGroups.push(classList.slice(i,i+studentsPerGroup))
         }
       return randomGroups  
    }

    const group = handleClick();
    
    const random_list = group.map(item=>{
       return(
        <div>
            <h2>GROUP {group.indexOf(item)}</h2>
                <ol>
                    {item.map(sub=>{
                      return(
                       <li>{sub}</li>
                    )
            })}
            </ol>
        
        </div>
       )
    })

    const student_list = students.map(student=>{
        return(
            <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
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
             
               {random_list}
             
            </div>
    </section>
    )
}