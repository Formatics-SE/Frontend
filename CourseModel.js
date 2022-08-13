const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    assignedLecturer: String,
    year: Number,
    semester: Number,
    registeredStudents: [
        {
            name: String,
            indexNumber: Number,
            cwa: Number,
            attendance: { type: Number, default: 0 },
            marks: { type: Number, default: 0 },
            group: Number
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
            poll: String,
            totalVotesCast: Number,
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