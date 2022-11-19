const express = require("express");
const router = express.Router();

const auth = require("./auth");
const Appointment = require("../../db/models/Appointment");
const Patient = require("../../db/models/Patient");
const Doctor = require("../../db/models/Doctor");

// get all appointments
router.get("/", auth, async (req, res) => {
    const user = await getUser(req);
    if (!user) return res.status(400).json({ message: "User does not exist." });

    let apps;
    if (req.user.type === "doctor") {
        apps = await Appointment.find({
            doctorId: user.id
        });
    }
    else {
        apps = await Appointment.find({
            patientId: user.id
        });
    }

    if (!apps) return res.status(400).json({ message: "No appointments." });
    return res.status(200).json(apps);
});

// get appointment
router.get("/:id", auth, async (req, res) => {
    let user = await getUser(req);
    if (!user) return res.status(400).json({ message: "User does not exist." });

    const app = await Appointment.findById({
        id: req.params.id
    });

    if (!app) return res.status(400).json({ message: "No appointment found." });
    if (app.patientId !== user.id || app.doctorId !== user.id) {
        return res.status(400).json({ message: "No appointment found." });
    }

    return res.status(200).json(app);
});

// create new appointment
router.post("/", auth, async (req, res) => {
    const user = await getUser(req);
    if (!user) return res.status(400).json({ message: "User does not exist." });

    if (req.user.type === "doctor") req.body.doctorId = req.user.id;
    else req.body.patientId = req.user.id;

    const appointment = await Appointment.create(req.body);

    return res.status(200).json({ message: "Success.", appointment });
})

// update specific appointment
router.put("/:id", auth, async (req, res) => {
    let user = await getUser(req);
    if (!user) return res.status(400).json({ message: "User does not exist." });
    
    let app = await Appointment.findById({
        id: req.params.id
    });

    // check user is owner
    if (!app) return res.status(400).json({ message: "No appointment found." });
    if (app.patientId !== user.id || app.doctorId !== user.id) {
        return res.status(400).json({ message: "No appointment found." });
    }
    
    app = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false
    })

    return res.status(200).json({message: "success", app})
});

/**
 * get the user id if doc or patient
 * @param {Request} req 
 */
const getUser = async req => {
    let user;
    if (req.user.type === "doctor") {
        user = await Doctor.findById({
            id: req.user.id
        });
    }
    else {
        user = await Patient.findById({
            id: req.user.id
        });
    }
    return user;
};

module.exports = router;