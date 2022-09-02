const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: String,
    password: String,
    indexNumber: Number,
    registeredCourses: [
        {
            courseName: String,
            courseCode: String,
            group: Number,
            assignedLecturer: String,
            year: Number,
            semester: Number,
            credits: Number
        }
    ]
});

module.exports = mongoose.model('Students', StudentSchema);