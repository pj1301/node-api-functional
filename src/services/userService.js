const debug = require('debug')('app:dataService');
const server = require('../environment/environment');
const { getClient } = require('./mongoService');

const { dbName, userCollection } = server;

const findUser = async (usernameObj) => {
  debug(`Finding user ${usernameObj.username}`);
  const client = await getClient();
  if (!client) return { error: 'There was an error connecting to the database' };
  const user = await client.db(dbName).collection(userCollection).findOne(usernameObj);
  if (!user || user === null) return false;
  return user;
}

const createUser = async (userObj) => {
  debug(`Creating user ${userObj.username}`);
  const client = await getClient();
  if (!client) return { error: 'There was an error connecting to the database' };
  const user = await client.db(dbName).collection(userCollection).insertOne(userObj);
  return user;
}

const getUserIds = async () => {
  const client = await getClient();
  if (!client) return { error: 'There was an error connecting to the database' };
  const ids = await client.db(dbName).collection(userCollection).find({}).toArray();
  return ids.map(user => user._id.toHexString());
}


module.exports = { findUser, createUser, getUserIds };