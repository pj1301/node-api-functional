const MongoClient = require('mongodb').MongoClient;
const server = require('../environment/environment');

const mongodOpt = { useUnifiedTopology: true };
const { apiUrl, dbName, userCollection } = server;

const getClient = async () => {
  const client = await MongoClient.connect(apiUrl, mongodOpt).catch(error => false);
  if (!client) return false;
  return client;
}

module.exports = { getClient };