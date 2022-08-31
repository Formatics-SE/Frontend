const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/',
    () => console.log('connected to mongodb'));

const StudentModel = require('./StudentModel');
const json = require('./Temp_RegStuds.json');
async function create() {
    try {
        json.forEach(async stud => {
            let nameSplit = stud.name.split(' ');
            let username = (nameSplit[1][0] + nameSplit[0]).toLowerCase();
            const a = StudentModel({
                username: username,
                password: '1234',
                indexNumber: stud.indexNumber,
                registeredCourses: [
                    {
                        courseName: 'Operating Systems',
                        courseCode: 'COE 354'
                    },
                    {
                        courseName: 'Introduction to Software Engineering',
                        courseCode: 'COE 356',
                    },
                    {
                        courseName: 'Embedded Systems',
                        courseCode: 'COE 358'
                    },
                    {
                        courseName: 'Database and Information Retrieval',
                        courseCode: 'COE 368'
                    },
                    {
                        courseName: "Digital Computer Design",
                        courseName: 'COE 382'
                    },
                    {
                        courseName: 'Autotronics Lab.',
                        courseCode: 'COE 392'
                    }
                ]
            })
            await a.save();
            console.log(a);
        });

        // const a = await StudentModel.find();

    } catch (error) {
        console.log(error.message);

    }
}

create();


app.listen(process.env.PORT, () => console.log('running on port 2022'));