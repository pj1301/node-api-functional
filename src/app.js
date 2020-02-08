const cors = require('cors');
const debug = require('debug')('app');
const express = require('express');
const authRouter = require('./controllers/authController')();
const { validateToken } = require('./services/authService');
const { getUserIds } = require('./services/dataService');

const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

const validateUserToken = async (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth) return res.send('No token provided');
  const validated = validateToken(auth);
  if (!validated) return res.send('Token invalid');
  const userIds = await getUserIds();
  if (userIds.includes(validated.id)) return next();
  res.send('Not authorised');
}

app.get('/test', validateUserToken, (req, res) => {
  res.send('GET working on app.js');
});

app.post('/test', validateUserToken, (req, res) => {
  debug(req.body);
  res.send({ status: 'Post working on app.js', data: req.body });
});

app.listen(port, () => debug(`Server working, listening on port ${port}`));