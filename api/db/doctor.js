const mongoose = require("mongoose");

const Doctor = new mongoose.Schema({
    username: {
        type: String,
    },
    fullName: {
        type: String,
    },
    password: {
        type: String,
    },
    practices: {
        type: [String],
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
})

module.exports = mongoose.model("Doctor", Doctor);