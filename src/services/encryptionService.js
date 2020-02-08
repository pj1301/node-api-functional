const bcrypt = require('bcrypt');
const saltRounds = 10;


const encryptPw = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds).catch(error => debug(error));
  return hash;
}

const decryptPw = async (password, hash) => {
  const result = await bcrypt.compare(password, hash).catch(error => debug(error));
  return result;
}

module.exports = { encryptPw, decryptPw };