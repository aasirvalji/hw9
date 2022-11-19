const express = require("express");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ message: "Hello world!" }));

app.use('/api/appointments', require('./appointments'));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));