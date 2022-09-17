const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode })
        if (courseData) {
            res.json({
                info: {
                    courseName: courseData.courseName,
                    courseCode: courseData.courseCode,
                    registeredStudents: courseData.registeredStudents,
                }
            })
        }
        else {
            res.json({ info: info })
        }
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;