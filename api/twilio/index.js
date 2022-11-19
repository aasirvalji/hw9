const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const notifyRelative = message => {
    client.messages
        .create({ body: message, from: '+18655688025', to: '+15199651728' })
        .then(message => console.log(message.sid));
};

module.exports = { notifyRelative };