const router = require('express').Router();
const auth = require('../../utils/auth');
const { notifyRelative } = require("../../twilio");

router.post('/relative', auth, async (req, res) => {

    try {
        const data = await getAmazonResults(req.query.q);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." })
        process.exit(1);
    }
});

module.exports = router;