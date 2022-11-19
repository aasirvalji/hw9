const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log(token, process.env.JWT_SECRET);
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = checkToken;
