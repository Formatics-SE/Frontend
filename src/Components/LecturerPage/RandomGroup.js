import React from "react"
import data from "./dummyDB"
import "./RandomGroup.css"
import {Card, Button, Navbar} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"


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
                <Card className="cards-container">
                    <Card.Body className="cards-body">
                        <Card.Title className="cards-title">GROUP {randomGroups.indexOf(item) + 1}</Card.Title>
                        <Card.Text>
                            {item.map(sub=>{
                              return(
                               <li>{sub}</li>
                            )
                    })}
                        </Card.Text>
                        <div className="cards-button">
                            <Button variant="secondary" size="sm">Open</Button>
                        </div>
                    </Card.Body>
                
                </Card>
               )
            })
            setDisplay(random_list)  
    }
    
    return(
    <section>
        <Navbar variant="secondary">
            <div className="container-outer">    
                <div className="container-inner">
                    <label htmlFor="division" className="label">GROUPS OF:</label>
                    <input type="number" id="division" name="division" value={value.division} className="division-box" min={2} max={10} onChange={handleChange}/>
                </div>
                <div>
                    <Button variant="light" className="submit-button1" onClick={handleShuffle}>Shuffle</Button>
                    <Button variant="light" type="submit" className="submit-button" placeholder="submit">Submit</Button>
                </div>
            </div>
        </Navbar>

        <div className="container-list-random">
            {display}
        </div>
    </section>
    )
}