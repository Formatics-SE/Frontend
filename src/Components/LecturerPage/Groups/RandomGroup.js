import React from "react"
import data from "../dummyDB"
import "./RandomGroup.css"
import {Card, Button, Navbar} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"


export default function RandomGroup(){
     const [value, setValue] = React.useState({
        division: 2,
        shuffle: false,
        random_group_display: <div>No group has been created yet</div>
    })
    
    const student_list = data.map(student=>{
        return(
            <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
    )
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
    function handleGroupCreation(){
            let classList = data.map(student=>{
                return `${student.firstName} ${student.lastName}`
            })
            ShuffleList(classList)
            let studentsPerGroup = Number(value.division)
            let randomGroups = []
            for(let i=0; i<classList.length;i= i + studentsPerGroup){
                randomGroups.push(classList.slice(i,i+studentsPerGroup))
            }
            const random_group = randomGroups.map(item=>{
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
                    </Card.Body>
                </Card>
               )
            }) 
    
            setValue(prev=>{
                return{
                    ...prev,
                    shuffle: true,
                    random_group_display: random_group
                }
            })
            
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
                    <Button variant="light" className="submit-button1" onClick={handleGroupCreation}>Create</Button>
                    <Button variant="light" type="submit" className="submit-button" placeholder="submit">Submit</Button>
                </div>
            </div>
        </Navbar>

       {value.shuffle? <div className="random-groups">
            {value.random_group_display}
        </div>: <div >
                    <ol className="class-list">
                        {student_list}
                    </ol>
                </div>}
    </section>
    )
}