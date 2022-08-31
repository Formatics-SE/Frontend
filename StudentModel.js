const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: String,
    password: String,
    indexNumber: Number,
    registeredCourses: [
        {
            courseName: String,
            courseCode: String
        }
    ] 
});

module.exports = mongoose.model('Students', StudentSchema);