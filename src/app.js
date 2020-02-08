const cors = require('cors');
const debug = require('debug')('app');
const express = require('express');
const routes = require('./controllers/routeController')();
const authRouter = require('./controllers/authController')();

const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use(cors());
app.use('/routes', routes);
app.use('/auth', authRouter);

app.get('/test', (req, res) => {
  res.send('GET working on app.js');
});

app.post('/test', (req, res) => {
  debug(req.body);
  res.send({ status: 'Post working on app.js', data: req.body });
});

app.listen(port, () => debug(`Server working, listening on port ${port}`));