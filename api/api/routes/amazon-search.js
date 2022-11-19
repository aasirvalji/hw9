const router = require('express').Router();
const auth = require('../../utils/auth');
const Patient = require('../../db/models/Patient');
const Doctor = require('../../db/models/Doctor');

const { getAmazonResults } = require("../../puppeteer");
const { notifyRelative } = require("../../twilio");

router.get('/', auth, async (req, res) => {
    // api/?q=mysearchquery
    const user = await getUser(req);
    console.log(user);

    try {
        const data = await getAmazonResults(req.query.q);
        const message = `\n\n${user.fullName} has requested  ${req.query.q}: \n\n${data.join("\n\n")}`;

        notifyRelative(message);
        console.log(message);

        return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." })
        process.exit(1);
    }
});

/**
 * get the user by id if doc or patient
 * @param {Request} req 
 */
const getUser = async req => {
    let user;
    if (req.user.type === "doctor") {
        user = await Doctor.findById({
            _id: req.user.id
        });
    }
    else {
        user = await Patient.findById({
            _id: req.user.id
        });
    }
    return user;
};

module.exports = router;