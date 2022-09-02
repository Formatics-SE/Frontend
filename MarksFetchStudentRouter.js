const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const indexNumber = req.body.indexNumber;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode })
        const registeredStudents = courseData.registeredStudents;

        let matchedStudent;
        for (let i = 0; i < registeredStudents.length; i++) {
            if (indexNumber == registeredStudents[i].indexNumber) {
                matchedStudent = registeredStudents[i]
                break
            }

        }
        if (matchedStudent) {
            res.json({ marksArray: matchedStudent.marksArray })
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