const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// initialize app
const app = express();

//allow cross-origin sharing
app.use(cors({origin: '*'}));

// connect to local mongodb database
mongoose.connect('mongodb://127.0.0.1:27017', 
    () => console.log('connected to mongodb'));

// importing routers
const StudentLoginRouter = require('./StudentLoginRouter');
const LecturerLoginRouter = require('./LecturerLoginRouter');
const CourseDataRouter = require('./CourseDataRouter');

const MarksUpdateRouter = require('./MarksUpdateRouter');
const MarksFetchStudentRouter = require('./MarksFetchStudentRouter');
const MarksFetchLecturerRouter = require('./MarksFetchLecturerRouter');

const AttendanceUpdateRouter = require('./AttendanceUpdateRouter');
const AttendanceFetchRouter = require('./AttendanceFetchRouter');

const GroupsFetchLecturerRouter = require('./GroupsFetchLecturerRouter');
const GroupsFetchStudentRouter = require('./GroupsFetchStudentRouter');
const GroupsUpdateRouter = require('./GroupsUpdateRouter');

// using routers
app.use('/studentlogin', StudentLoginRouter);
app.use('/lecturerlogin', LecturerLoginRouter);
app.use('/coursedata', CourseDataRouter);

app.use('/updatemarks', MarksUpdateRouter);
app.use('/fetchstudentmarks', MarksFetchStudentRouter);
app.use('/fetchlecturermarks', MarksFetchLecturerRouter);

app.use('/fetchattendance', AttendanceFetchRouter);
app.use('/updateattendance', AttendanceUpdateRouter);

app.use('/fetchlecturergroups', GroupsFetchLecturerRouter);
app.use('/fetchstudentgroup', GroupsFetchStudentRouter);
app.use('/updategroups', GroupsUpdateRouter);


// assigning port
app.listen(process.env.PORT, () => console.log('running on port 2022'));