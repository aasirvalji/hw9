const router = require('express').Router();
const auth = require('../../utils/auth');
const path = require('path');
const Doctor = require('../../db/models/Doctor');
const Patient = require('../../db/models/Patient');
const Pill = require('../../db/models/Pill');
const tesseract = require('node-tesseract-ocr');
const cohere = require('cohere-ai');

cohere.init(process.env.COHERE_API_KEY);

router.get('/', auth, async (req, res) => {
  console.log(req.user);
  const pills = await Pill.find({ user: req.user.id });

  return res.status(200).json({ pills: pills });
});

// create a pill that's about to be uploaded
router.post('/create', auth, async (req, res) => {
  const pill = await Pill.create({
    user: req.user.id,
    url: req.body.url,
    uploading: true,
  });

  return res.status(200).json({ id: pill.id });
});

router.get('/create/:id', auth, async (req, res) => {
  var pill = await Pill.findById(req.params.id);

  if (!pill) return res.status(404).json({ message: 'Pill not found' });

  pill.uploading = false;
  await pill.save();

  console.log(`converting image ${pill.id} to longtext`);
  pill.longtext = await tesseract.recognize(pill.url, {
    lang: 'eng',
    oem: 1,
    psm: 3,
  });

  // TODO: Short tokens by values
  console.log(`converting longtext ${pill.id} to tokens`);
  var cohereRes = await cohere.tokenize({
    text: pill.longtext,
  });
  pill.tokens = cohereRes.body.token_strings;

  await pill.save();

  return res.status(200).json({ id: pill.id });
});

module.exports = router;
