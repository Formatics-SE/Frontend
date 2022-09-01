const express = require('express')
const router = express.Router();

//importing course Model
const CourseModel = require('./CourseModel')

router.post('/', express.json(), async(req,res) => 

{
    const courseCode = req.body.courseCode;
    
    try{
        const courseData = await CourseModel.findOne({courseCode: courseCode});
        const registeredStudents = courseData.registeredStudents;


        
        if(registeredStudents)
        {
            res.json({registeredStudents: registeredStudents});
        }

        else
        {
            res.json({registeredStudents: null});
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
}
);

module.exports = router;


