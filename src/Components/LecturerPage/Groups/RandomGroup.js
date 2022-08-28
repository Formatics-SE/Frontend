import React from "react"
import data from "../dummyDB"
import "./RandomGroup.css"
import Card from "react-bootstrap/Card"
import "bootstrap/dist/css/bootstrap.min.css"


export default function RandomGroup(props){
     const [showRandomGroups, setValue] = React.useState(true)
    
    // const student_list = data.map(student=>{
    //     return(
    //         <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
    // )
    // })



   
    // function handleChange(event){
    //     const {name, value}= event.target
    //     setValue(prev=>{
    //         return{
    //             ...prev,
    //             [name]:value 
    //         }
    //     })
    // }
    

    
    function ShuffleList(list){   // a function to shuffle the list for random grouping
        for(let i=list.length-1;i>0;i--){
            let randomNumber = Math.floor(Math.random()*(i+1))
            let temp = list[i]
            list[i] = list[randomNumber]
            list[randomNumber] = temp
        }   
    }
    function createArraysForGroups(numberOfGroups){
        let emptyList = []
        let groupContainer = []
        for(let i=0;i<numberOfGroups;i++){
            emptyList.push(groupContainer)
        }
        return emptyList
    }
    
   let classList = data.map(student=>{
         return `${student.firstName} ${student.lastName}: ${student.cwa}`
            })
            ShuffleList(classList)
            let studentsPerGroup = Number(props.value_prop)
            let division = Math.ceil(classList.length/studentsPerGroup)
            let  classDivision= []
            for(let i=0; i<classList.length;i= i + division){
                classDivision.push(classList.slice(i,i+division))
            }
            let randomGroups = createArraysForGroups(division) 
            let x = 0
            for(let i=0;i<classDivision.length;i++){
                for(let j=0;j<classDivision[i].length;j++){
                    if(x===randomGroups.length){
                        x = 0
                    }
                    else{
                    randomGroups[x].push(classDivision[i].pop(j))
                    x += 1
                    }
                }
            }
            

            let random_group = randomGroups.map(item=>{
             return(
             <Card className="cards-container">
                <Card.Body className="cards-body">
                    <Card.Title className="cards-title">GROUP {classDivision.indexOf(item) + 1}</Card.Title>
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
    
            
    
    
    return(
    <section>    
        <h2 className="random-groups-heading">Groupings</h2>
        <div className="random-groups">
            {random_group}
        </div>

    </section>
    )
}