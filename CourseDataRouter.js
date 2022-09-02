const express = require('express')
const router = express.Router();

const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        if (courseData) {
            res.json({ courseData: courseData });
        }
        else {
            res.json({ courseData: null });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;