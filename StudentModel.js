<<<<<<< HEAD
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

=======
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

>>>>>>> 5ab7f77d7c1ddab9852858411446a4238a2fdfac
module.exports = mongoose.model('Students', StudentSchema);