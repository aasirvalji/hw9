const router = require('express').Router();
const auth = require('../../utils/auth');
const Patient = require('../../db/models/Patient');
const cohere = require('cohere-ai');

cohere.init(process.env.COHERE_API_KEY);

router.get('/', auth, async (req, res) => {
    const patients = await Patient.find({});
    if (!patients) return res.status(400).json({ message: "No patients exist." });
    return res.status(200).json(patients);
});

module.exports = router;
