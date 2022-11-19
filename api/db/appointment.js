const mongoose = require("mongoose");

const Appointment = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
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

module.exports = mongoose.model("Appointment", Appointment);