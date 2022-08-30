import React from "react"
import data from "../dummyDB"
import "./RandomGroup.css"
import Card from "react-bootstrap/Card"
import "bootstrap/dist/css/bootstrap.min.css"


export default function RandomGroup(props){
     // let  classDivision= []
            // for(let i=0; i<classList.length;i= i + division){
            //     classDivision.push(classList.slice(i,i+division))
            // }
    
    // function ShuffleList(list){   // a function to shuffle the list for random grouping
    //     for(let i=list.length-1;i>0;i--){
    //         let randomNumber = Math.floor(Math.random()*(i+1))
    //         let temp = list[i]
    //         list[i] = list[randomNumber]
    //         list[randomNumber] = temp
    //     }   
    // }
   
   
    
   let classList = data.map(student=>{
         return `${student.firstName} ${student.lastName}: ${student.cwa}`
            })
            let studentsPerGroup = Number(props.value_prop)
            let division = Math.ceil(classList.length/studentsPerGroup)
            let randomGroupingByCwa = []
            let count = 0

            // forms groups based on their CWAs
            // picks students from each sub-division(first class, second class and so on) and adds to the group            
            for(let i=0;i<division;i++){
                let newArray = []
                while(count<classList.length){
                    newArray.push(classList[count])
                    count = count + division
                }
                randomGroupingByCwa.push(newArray)
                count = i + 1
                }
            
            

            let random_group = randomGroupingByCwa.map(item=>{
             return(
             <Card className="cards-container">
                <Card.Body className="cards-body">
                    <Card.Title className="cards-title">GROUP {randomGroupingByCwa.indexOf(item) + 1}</Card.Title>
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