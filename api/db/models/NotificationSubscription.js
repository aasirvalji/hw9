const mongoose = require('mongoose');

const NotificationSubscription = new mongoose.Schema({
    endpoint: String,
    expirationTime: String,
    keys: {
        p256dh: String,
        auth: String,
    },
});

module.exports = mongoose.model('NotificationSubscription', NotificationSubscription);