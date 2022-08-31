const express = require('express')
const router = express.Router();

//importing course Model
const CourseModel = require('./CourseModel')

router.post('/', express.json(), async(req,res) => 

{
    const courseCode = req.body.courseCode;
    const courseData = await CourseModel.findOne({courseCode: courseCode});
    try{
        if(courseData)
        {
            res.json({registeredStudents: courseData.registeredStudents})
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