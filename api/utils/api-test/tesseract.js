const tesseract = require('node-tesseract-ocr');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
};

(async () => {
  try {
    console.log('converting image to text');
    var text = await tesseract.recognize(
      'https://ltcnews-cdn.s3.amazonaws.com/articles/the-medication-label-what-to-look-for/the-medication-label-what-to-look-for-large.jpg',
      config
    );
    console.log(text);
  } catch (err) {
    console.log(err);
  }
})();
