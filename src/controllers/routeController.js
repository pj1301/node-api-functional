const debug = require('debug')('app:routeController');
const express = require('express');

const routes = express.Router();

const router = () => {
  routes.route('/test')
    .get((req, res) => {
      res.send('GET working on routerController');
    })
    .post((req, res) => {
      res.send({ status: 'POST working on routerController', data: req.body });
    })
    
  return routes
}

module.exports = router;