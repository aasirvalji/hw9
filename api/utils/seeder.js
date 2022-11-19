const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/../.env` });
const Patient = require('../db/models/Patient');
const Pill = require('../db/models/Pill');
require('colors');

const pills = JSON.parse(
  fs.readFileSync(`${__dirname}/data/pills.json`, 'utf-8')
);

var arg = process.argv[2];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const importData = async () => {
      try {
        if (arg == '-p') {
          await Pill.create(pills);
        } else {
          console.log('Invalid argument...'.red);
          process.exit(1);
        }
        console.log('Data Imported...'.green);
      } catch (err) {
        console.error(err);
      }
    };

    await importData();
  })
  .catch((err) => console.log(err));
