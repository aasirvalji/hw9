const router = require('express').Router();
const auth = require('../../utils/auth');
const Doctor = require('../../db/models/Doctor');

router.get('/', auth, async (req, res) => {
    const doctors = await Doctor.find({});
    if (!doctors) return res.status(400).json({ message: "No doctors exist." });
    return res.status(200).json(doctors);
});

module.exports = router;
