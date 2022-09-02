const express = require('express')
const router = express.Router();

// import student model
const StudentModel = require('./StudentModel');

// handles requests made to /studentlogin
router.post('/', express.json(), async (req, res) => {
    // get login credentials
    const username = req.body.username;
    const password = req.body.password;

    try {
        // query student by 'username' and 'password'
        const studentData = await StudentModel.findOne({
            username: username,
            password: password
        });
        // if a match is found...
        if (studentData) {
            // return the index number, which will be used as a key to obtain course data
            // return array of registered courses
            res.json({
                studentData:
                {
                    indeNumber: studentData.indeNumber,
                    registeredCourses: studentData.registeredCourses
                }
            });
        }
        else {
            res.json({ studentData: null });
        }

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;