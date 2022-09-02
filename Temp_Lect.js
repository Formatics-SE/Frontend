const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/',
    () => console.log('connected to mongodb'));

const LecturerModel = require('./LecturerModel');
async function create() {
    try {
        const a = await LecturerModel({
            username: 'bkommey',
            password: '1234',
            staff_id: 201102,
            assignedCourses: [
                {
                    courseName: 'Operating Systems',
                    courseCode: 'COE 354'
                },
                {
                    courseName: 'Embedded Systems',
                    courseCode: 'COE 358'
                }
            ]
        });
        await a.save();

        // const a = await LecturerModel.deleteMany();
        
        console.log(a);

    } catch (error) {
        console.log(error.message);

    }
}

create();


app.listen(process.env.PORT, () => console.log('running on port 2022'));