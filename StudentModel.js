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
    ] // course codes
});

module.exports = mongoose.model('Students', StudentSchema);