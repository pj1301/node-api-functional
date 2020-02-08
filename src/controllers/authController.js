const debug = require('debug')('app:authController');
const express = require('express');
const { findUser, createUser } = require('../services/dataService');
const { encryptPw, decryptPw } = require('../services/encryptionService');
const { generateToken } = require('../services/authService');

const authRouter = express.Router();

const router = () => {

  authRouter.route('/register')
    .post(async (req, res) => {
      // First search the user
      const { username, password } = req.body;
      const user = await findUser({ username });

      // if an error occurs or the user is found, exit
      if (user.error) return res.send(user.error);
      if (user.username) return res.send('User already registered, please sign in');

      // else create a hashed pw and create the user
      const newUserPw = await encryptPw(password);
      const newUser = { username, password: newUserPw };
      const dbConfirm = await createUser(newUser);
      res.send(dbConfirm.result.ok === 1 ? dbConfirm : 'An error occurred');
    })

  authRouter.route('/login')
    .post(async (req, res) => {
      // First search for the user
      const { username, password } = req.body;
      const user = await findUser({ username });

      // if an error occurs or no user is found, exit
      if (user.error) return res.send(user.error);
      if (!user) return res.send('User credentials incorrect, please try again');

      // else check password and if wrong reject and exit
      const verifyPw = await decryptPw(password, user.password);
      if (!verifyPw) return res.send('User credentials incorrect, please try again')

      // else create a token and send back to the user
      const token = generateToken(user._id);
      res.send(token);
    })
  
  return authRouter;
}

module.exports = router;