// scripts/test-mongo.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'animedex';

(async () => {
  if (!uri) {
    console.error('MONGODB_URI not set. Create .env.local or export MONGODB_URI in your shell.');
    process.exit(1);
  }

  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db(dbName);
    const cols = await db.collections();
    console.log('Connected OK. Collections:', cols.map(c => c.collectionName));
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection error:');
    console.error(err);
    process.exit(1);
  }
})();
