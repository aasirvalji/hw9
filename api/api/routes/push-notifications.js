const router = require('express').Router();
const auth = require('../../utils/auth');
const webpush = require('web-push');

const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const publicKey = process.env.VAPID_PUB_KEY
const privateKey = process.env.VAPID_PRV_KEY
webpush.setVapidDetails('mailto:mattliuusa@hotmail.com', publicKey, privateKey);


router.post("/subscribe", (req, res) => {
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({ title: 'Section.io Push Notification' });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
    console.log(subscription);
})

module.exports = router;