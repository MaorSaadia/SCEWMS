const jwt = require('jsonwebtoken');
const HttpError = require('../httpError');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      console.log('erorr');
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log('error');
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
