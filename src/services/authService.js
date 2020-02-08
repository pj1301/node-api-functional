const debug = require('debug')('app:authService');
const jwt = require('jsonwebtoken');

const secret = 'Es el secreto';

const generateToken = (id) => {
  const token = jwt.sign({ id }, secret, { algorithm: 'HS256', expiresIn: '1h' });
  return token;
}

const validateToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    debug(error.message);
    return false;
  }
  return decoded;
}

module.exports = { generateToken, validateToken };