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
    type: Date,
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
});

module.exports = mongoose.model('appointment', Appointment);
