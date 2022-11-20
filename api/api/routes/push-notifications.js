const router = require('express').Router();
const auth = require('../../utils/auth');
const webpush = require('web-push');
const NotificationSubscription = require("../../db/models/NotificationSubscription");

const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const publicKey = process.env.VAPID_PUB_KEY
const privateKey = process.env.VAPID_PRV_KEY
webpush.setVapidDetails('mailto:mattliuusa@hotmail.com', publicKey, privateKey);


router.post("/subscribe", async (req, res) => {
    const subscription = req.body;

    // find existing
    const existingSub = await NotificationSubscription.findOne(subscription);
    if (existingSub) return res.status(200).json({ message: "Already subscribed." });

    // create new one
    await NotificationSubscription.create(subscription);
    return res.status(200).json({ message: "Subscribed to notifications." });
});

router.get("/", async (req, res) => {
    sendNotification();
    res.status(200).json({ message: "Notifications sent." })
})

const sendNotification = async () => {
    const subs = await NotificationSubscription.find({});

    for (let sub of subs) {
        const payload = JSON.stringify({ title: 'Please take your medication', message: "hello world" });
        webpush.sendNotification(sub, payload);
    }
}

module.exports = router;