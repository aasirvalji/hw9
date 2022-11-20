const router = require('express').Router();
const auth = require('../../utils/auth');
const path = require('path');
const Doctor = require('../../db/models/Doctor');
const Patient = require('../../db/models/Patient');
const Pill = require('../../db/models/Pill');
const tesseract = require('node-tesseract-ocr');
const cohere = require('cohere-ai');
const { getAmazonResults } = require('../../puppeteer');
const { notifyRelative } = require('../../twilio');
const defaultData = require('../../utils/data/default.json');

cohere.init(process.env.COHERE_API_KEY);

router.get('/', auth, async (req, res) => {
  const pills = await Pill.find({ user: req.user.id }).sort('-created');

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

router.post('/create/:id', auth, async (req, res) => {
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

  pill = await pill.save();
  console.log('from server: ' + pill);

  var user = await Patient.findById(req.user.id);

  if (!user)
    return res.status(404).json({ message: 'Unable to find patient profile' });

  console.log('Username: ' + user.fullName + 'and: ' + pill.longtext.trim());
  // console.log(1);
  var amazonResults = [];
  // console.log(amazonResults);
  var amazonResults = await getAmazonResults(pill.longtext.trim());
  amazonResults = amazonResults.length === 0 ? ['L + ratio'] : amazonResults;
  console.log(amazonResults);
  const message = `\n\n${user.fullName} has requested ${
    pill.longtext
  }: \n\n${amazonResults.join('\n\n')}`;
  // console.log(3);
  // send twilio message
  notifyRelative(message);
  // console.log(4);
  return res.status(200).json(pill);
});

module.exports = router;
