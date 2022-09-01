const express = require('express')
const router = express.Router();

//importing course Model
const CourseModel = require('./CourseModel')

router.post('/', express.json(), async(req,res) => 

{
    const courseCode = req.body.courseCode;
    const attendanceData = req.body.attendanceData; 
    
    try{
        const courseData = await CourseModel.findOne({courseCode: courseCode});
        let registeredStudents = courseData.registeredStudents;

        attendanceData.forEach(attendanceObject => {
            for(let i=0; i< registeredStudents.length-1; i++){
                if (attendanceObject.indexNumber === registeredStudents[i].indexNumber){
                    registeredStudents[i].attendance = attendanceObject.attendance;
                    registeredStudents[i].strikes = attendanceObject.strikes;

                }
            }
        })

        const update = await CourseModel.updateOne(
            {courseCode: courseCode}, 
            { 
                [registeredStudents] : registeredStudents
            }
        )
        if(update)
        {
            res.json({successful: true});
        }

        else
        {
            res.json({successful: false});
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
}
);

module.exports = router;


