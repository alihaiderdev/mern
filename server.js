// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT | 8080;

// mongoose
//   .connect('mongodb://localhost:27017/techzone')
//   .then(() => console.log('Connected to DB'))
//   .catch((e) => console.log(`Error: ${e.message}`));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

const { MongoClient } = require('mongodb');

async function main() {
  const uri = `mongodb+srv://admin:admin@techzonemwf.vmlqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    await client.close();
  }
}
main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log('Databases: ');
  databasesList.databases.forEach(async (db, i) => {
    console.log(`${i} - ${db.name}`);
  });
}
