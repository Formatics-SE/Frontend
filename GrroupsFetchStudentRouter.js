const express = require('express')
const router = express.Router();

//importing course Model
const CourseModel = require('./CourseModel')

router.post('/', express.json(), async (req, res) => {
    const courseCode = req.body.courseCode;
    const groupNumber = req.body.group;

    try {
        const courseData = await CourseModel.findOne({ courseCode: courseCode });
        let groups = courseData.groups;
        let groupMatch;
        for (let i=0;i<groups.length -1;i++){
            if(groupNumber===groups[i].number){
              groupMatch=groups[i] 
              break; 
            }
        }
        if (groupMatch) {
            res.json({ group: groupMatch });
        }

        else {
            res.json({ group: groupMatch });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
);

module.exports = router;

