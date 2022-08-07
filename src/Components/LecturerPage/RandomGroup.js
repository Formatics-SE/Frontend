import React from "react"
import data from "./dummyDB"
import "./RandomGroup.css"


export default function RandomGroup(){
     const [value, setValue] = React.useState({
        division: 2,
        view: ""
    })
    const student_list = data.map(student=>{
        return(
            <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
    )
    })

    const [display, setDisplay] = React.useState(student_list)
   
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
    function handleShuffle(){
            let classList = data.map(student=>{
                return `${student.firstName} ${student.lastName}`
            })
            ShuffleList(classList)
            let studentsPerGroup = Number(value.division)
            let randomGroups = []
            for(let i=0; i<classList.length;i= i + studentsPerGroup){
                randomGroups.push(classList.slice(i,i+studentsPerGroup))
            }
            const random_list = randomGroups.map(item=>{
               return(
                <div>
                    <h2>GROUP {randomGroups.indexOf(item) + 1}</h2>
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
            setDisplay(random_list)  
    }
    
    return(
    <section>
            <div className="container-outer">    
                <div className="container-inner">
                    <label htmlFor="division" className="label">GROUPS OF:</label>
                    <input type="number" id="division" name="division" value={value.division} className="division-box" min={2} max={10} onChange={handleChange}/>
                </div>
                <div>
                    <button className="submit-button1" onClick={handleShuffle}>Shuffle</button>
                    <input type="submit" className="submit-button" placeholder="submit" />
                </div>

            </div>
            <div className="container-list-random">
                {display}
            </div>
    </section>
    )
}