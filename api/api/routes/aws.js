const router = require('express').Router();
const auth = require('../../utils/auth');
var AWS = require('aws-sdk');
const Pill = require('../../db/models/Pill');
const tesseract = require('node-tesseract-ocr');
const { AWS_URL } = require('../../utils/consts.json');

const awsRegion = process.env.BUCKET_REGION;
const awsBucket = process.env.BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region: awsRegion,
});

// List S3 objects
router.get('/', auth, (req, res) => {
  var s3 = new AWS.S3();

  var params = {
    Bucket: awsBucket,
  };

  s3.listObjects(params, function (err, data) {
    if (err) throw err;
    return res.status(200).json({ hello: data.Contents });
  });
});

// Get pre signed URL
router.post('/', auth, (req, res) => {
  const s3 = new AWS.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: awsBucket,
    Key: 'images/' + fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${awsBucket}.s3.amazonaws.com/images/${fileName}`,
    };

    return res.json({ success: true, data: { returnData } });
  });
});

// Get data post-upload
router.post('/contract', async (req, res) => {
  var key = req.body.key.split('/')[1];
  console.log('Contract key: ' + key);
  var pill = await Pill.findOne({ title: key });
  if (!pill)
    return res
      .status(404)
      .json({ body: 'Couldnt find a pill matching that key' });
  pill.source.uploading = false;
  await pill.save();
  console.log('Upload for ' + key + ' completed');

  // do tesseract transform here
  const url = AWS_URL + `/${key}`;

  console.log(`converting ${url} to longtext`);
  pill.longtext = await tesseract.recognize(url, {
    lang: 'eng',
    oem: 1,
    psm: 3,
  });
  await pill.save();

  // send notification to client here

  return res.status(200).json({ hello: 'world' });
});

router.get('/contract', (req, res) => {
  console.log('from get contract block: ' + JSON.stringify(req.body));
  return res.status(200).json({ hello: 'world' });
});

module.exports = router;
