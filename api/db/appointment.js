const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Appointment", appointment);