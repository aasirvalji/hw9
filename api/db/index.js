const mongoose = require('mongoose');
const colors = require('colors');

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB'.blue);
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
}

module.exports = connectDB;
