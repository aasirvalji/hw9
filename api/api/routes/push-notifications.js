const router = require('express').Router();
const webpush = require('web-push');
const NotificationSubscription = require('../../db/models/NotificationSubscription');
const Patient = require('../../db/models/Patient');
const Pill = require('../../db/models/Pill');
const auth = require('../../utils/auth');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const publicKey = process.env.VAPID_PUB_KEY;
const privateKey = process.env.VAPID_PRV_KEY;
webpush.setVapidDetails('mailto:mattliu1728@gmail.com', publicKey, privateKey);

router.post('/subscribe', async (req, res) => {
  const subscription = req.body;

  // find existing
  const existingSub = await NotificationSubscription.findOne(subscription);
  if (existingSub)
    return res.status(200).json({ message: 'Already subscribed.' });

  // create new one
  await NotificationSubscription.create(subscription);
  return res.status(200).json({ message: 'Subscribed to notifications.' });
});

router.get('/', async (req, res) => {
  sendNotification();
  res.status(200).json({ message: 'Notifications sent.' });
});

const sendNotification = async () => {
  const subs = await NotificationSubscription.find({});

  const options = {
    title: 'Medication time',
    body: 'Make sure to take your medication',
    icon: 'https://media.istockphoto.com/id/859901818/vector/pill-icon-flat.jpg?s=612x612&w=0&k=20&c=KjfXKGhbJM9LU67f8d90qiKRQIUuwN9c00kSNp2ONWc=',
    vibrate: [200, 100, 200],
    tag: 'new-product',
    image:
      'https://media.istockphoto.com/id/859901818/vector/pill-icon-flat.jpg?s=612x612&w=0&k=20&c=KjfXKGhbJM9LU67f8d90qiKRQIUuwN9c00kSNp2ONWc=',
    badge:
      'https://media.istockphoto.com/id/859901818/vector/pill-icon-flat.jpg?s=612x612&w=0&k=20&c=KjfXKGhbJM9LU67f8d90qiKRQIUuwN9c00kSNp2ONWc=',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
    ],
  };

  for (let sub of subs) {
    const payload = JSON.stringify(options); //{ title: "Test" }); // JSON.stringify(options);
    webpush.sendNotification(sub, payload);
  }
};

router.get('/medicine', auth, async (req, res) => {
  const user = await Patient.findById(req.user.id);

  var pills = await Pill.find({ user: user.id }).sort('-created');
  console.log(pills);
  var pillsGen = [];

  for (var i = 0; i < 2; i++) {
    var r = {
      user: pills[i].user,
      url: pills[i].url,
      longtext: pills[i].longtext,
      created: pills[i].created,
    };
    if (i === 0) {
      r.prev = Math.floor(Math.random() * (6 - 3) + 3);
      r.next = Math.floor(Math.random() * (2 - 1) + 1);
    } else {
      r.prev = Math.floor(Math.random() * (12 - 10) + 10);
      r.next = Math.floor(24 - r.prev);
    }
    pillsGen.push(r);
  }

  return res.status(200).json({ name: user.fullName, pills: pillsGen });
});

module.exports = router;
