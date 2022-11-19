const router = require('express').Router();
const auth = require('../../utils/auth');
const { getAmazonResults } = require("../../puppeteer");

router.get('/', auth, async (req, res) => {
    // api/?q=mysearchquery

    try {
        const data = await getAmazonResults(req.query.q);
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." })
        process.exit(1);
    }
});

module.exports = router;