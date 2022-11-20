const router = require('express').Router();
const webpush = require('web-push');
const NotificationSubscription = require("../../db/models/NotificationSubscription");

const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const publicKey = process.env.VAPID_PUB_KEY;
const privateKey = process.env.VAPID_PRV_KEY;
webpush.setVapidDetails('mailto:mattliu1728@gmail.com', publicKey, privateKey);

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

    const options = {
        title: "New Product Available",
        body: "Take a look at this brand new t-shirt!",
        icon: "https://www.w3schools.com/images/lamp.jpg",
        vibrate: [200, 100, 200],
        tag: "new-product",
        image: "https://www.w3schools.com/images/lamp.jpg",
        badge: "https://www.w3schools.com/images/lamp.jpg",
        actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    };

    for (let sub of subs) {
        const payload = JSON.stringify(options)//{ title: "Test" }); // JSON.stringify(options);
        webpush.sendNotification(sub, payload);
    }
}

module.exports = router;