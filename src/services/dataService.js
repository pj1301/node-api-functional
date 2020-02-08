const debug = require('debug')('app:dataService');
const MongoClient = require('mongodb').MongoClient;
const server = require('../environment/environment');

const mongodOpt = { useUnifiedTopology: true };
const { apiUrl, dbName, userCollection } = server;

const getClient = async () => {
  const client = await MongoClient.connect(apiUrl, mongodOpt).catch(error => false);
  if (!client) return false;
  return client;
}

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