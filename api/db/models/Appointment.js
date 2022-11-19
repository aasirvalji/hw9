const mongoose = require('mongoose');

const Appointment = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model('appointment', Appointment);
