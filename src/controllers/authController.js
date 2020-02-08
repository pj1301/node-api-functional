const debug = require('debug')('app:authController');
const express = require('express');

const authRouter = express.Router();

const router = () => {
  authRouter.route('/')
    .get((req, res) => {
      res.send({ status: 'GET working on authRouter' });
    })
    .post((req, res) => {
      res.send({ status: 'POST working on authRouter', data: req.body });
    })
  
  return authRouter;
}

module.exports = router;