const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    assignedLecturer: String,
    year: Number,
    semester: Number,
    credits: Number,    // new entry
    registeredStudents: [
        {
            name: String,
            indexNumber: Number,
            cwa: Number,
            attendance: { type: Number, default: 0 },
            strikes: { type: Number, default: 0 },
            group: Number,
            marksArray: [
                {
                    marks: { type: Number, default: 0 },
                    date: String
                }
            ]
        }
    ],
    groups: [
        {
            number: Number,
            members: [{ name: String, indexNumber: Number }],
            score: { type: Number, default: 0 }
        }
    ],
    polls: [
        {
            title: String,
            totalVotesCast: { type: Number, default: 0 },
            options: [
                {
                    option: String,
                    votes: Number
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Courses', CourseSchema);