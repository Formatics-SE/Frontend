const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.marks, async (req, res) => {
    const courseCode = req.body.courseCode;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode })
        const registeredStudents = courseData.registeredStudents;

        if (registeredStudents) {
            res.json({ registeredStudents: registeredStudents })
        }
        else {
            res.json({ marksArray: null })

        }


    } catch (error) {
        console.log(error.message)
    }


    // while (marks >100){
    //     marks = marksData + marks
    // }





})

module.exports = router;