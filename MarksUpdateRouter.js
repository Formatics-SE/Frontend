const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.marks, async (req, res) => {
    const courseCode = req.body.courseCode;
    const marksData = req.body.marksData;
    const date = req.body.date;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode })
        const registeredStudents = courseData.registeredStudents;

        marksData.forEach(marksObject => {
            for (let i = 0; i < registeredStudents.length; i++) {
                if (marksObject.indexNumber === registeredStudents[i].indexNumber) {
                    registeredStudents[i].marksArray.push({
                        marks: marksObject.marks,
                        date: date
                    }) 
                    break;
                }
            }
        });

        const update = await CourseModel.updateOne(
            { courseCode: courseCode },
            {
                [registeredStudents]: registeredStudents
            });


    } catch (error) {
        console.log(error.message)
    }


    // while (marks >100){
    //     marks = marksData + marks
    // }





})

module.exports = router;