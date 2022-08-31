const express = require('express')
const router = express.Router();

const LecturerModel = require('./LecturerModel');
const CourseModel = require('./CourseModel');

router.post('/', express.json(), async (req, res) => {
    const title = req.body.title;
    const options = req.body.options;
    const courseCode = req.body.courseCode;

    console.log('title: ', title)
    console.log('options: ', options)
    console.log('courseCode: ', courseCode)

    try {
        const newPoll = await CourseModel.updateOne(
            {
                courseCode: courseCode
            },
            {
                $push: {
                    polls: {
                        title: title,
                        options: options
                    }
                }
            }
        );

        // if poll is created successfully...
        if (newPoll) {
            res.json({ successful: true });
        }
        else {
            res.json({ successful: false });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;