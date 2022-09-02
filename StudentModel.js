<<<<<<< HEAD
=======
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
>>>>>>> 7ba6d1cc2117fb0a4c5e452debc718966205e7a4
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

<<<<<<< HEAD
=======
>>>>>>> 5ab7f77d7c1ddab9852858411446a4238a2fdfac
>>>>>>> 7ba6d1cc2117fb0a4c5e452debc718966205e7a4
module.exports = mongoose.model('Students', StudentSchema);