const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/', 
() => console.log('connected to mongodb'));

const  CourseModel = require('./CourseModel');
const  json = require('./Temp_RegStuds.json');

async function create() {
    try {
        const a = await CourseModel({
           courseName: 'Operating Systems',
           courseCode: 'COE 354',
           assignedLecturer: 'B. Kommey',
           year: 3,
           semester: 2,
           registeredStudents: json
        });
        await a.save();

        // const a = await CourseModel.deleteMany();

        console.log(a);
        
    } catch (error) {
        console.log(error.message);
        
    }
}

create();


app.listen(process.env.PORT, () => console.log('running on port 2022'));