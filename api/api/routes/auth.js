const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../../utils/auth');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../../db/models/User');

// get user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Please try again later.' });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compare(password, user.password); // hash has the ciphertext, cost and random salt used

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Please try again later.' });
  }
});

// register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('From server: ' + username, password);
    if (!username || !password)
      return res
        .status(422)
        .json({ msg: 'Username and password cannot be empty' });

    let user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
    });

    const salt = await bcrypt.genSalt(10); // generate salt to help randomize the hash
    user.password = await bcrypt.hash(password, salt); // hash has the ciphertext, cost and random salt used
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
