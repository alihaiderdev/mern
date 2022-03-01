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

// const { MongoClient } = require('mongodb');

// async function main() {
//   const uri = `mongodb+srv://admin:admin@techzonemwf.vmlqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     // await listDatabases(client);
//     await createListing(client, {
//       name: 'Lovely Loft',
//       summary: 'A charming loft in paris',
//       bedrooms: 1,
//       bathrooms: 2,
//     });
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//   } finally {
//     await client.close();
//   }
// }
// main().catch(console.error);

// async function createListing(client, newListing) {
//   const result = await client
//     .db('sample_airbnb')
//     .collection('listingsAndReviews')
//     .insertOne(newListing);
//   console.log(
//     `New listing created with the following id: ${result.insertedId}`
//   );
//   `${result.insertedCounts} ${result.insertedIds}`;
// }

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log('Databases: ');
//   databasesList.databases.forEach(async (db, i) => {
//     console.log(`${i} - ${db.name}`);
//   });
// }

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://admin:admin@techzonemwf.vmlqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to DB');
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
main().catch(console.error);

// all application routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/user', async (req, res) => {
  try {
    await create(client, 'techzone', 'users', req.body);
    console.log(req.body);
    res.status(201).json({ msg: 'Success', data: req.body });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ msg: error.message });
  }
});

// frontEnd Side you should implement this
{
  /* <button
  onClick={() => signup({ firstName, lastName, email, password })}
></button>;
async function signup(user) {
  // const res = await axios.post("http://localhost:8080/api/user")
  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/api/user",
      data: { firstName, lastName, email, password },
    });
    console.log(res);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
} */
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

async function create(client, db, collection, createdDocument) {
  const result = await client
    .db(db)
    .collection(collection)
    .insertOne(createdDocument);
  // `${result.insertedCounts} ${result.insertedIds}`;
  return result;
}
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log('Databases: ');
  databasesList.databases.forEach((db, i) => {
    console.log(`${i} - ${db.name}`);
  });
}
async function createListing(client, newListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
  `${result.insertedCounts} ${result.insertedIds}`;
}
async function createUser(client, user) {
  const result = await client
    .db('front-to-back')
    .collection('users')
    .insertOne(user);
  console.log(`Created with the following id: ${result.insertedId}`);
  `${result.insertedCounts} ${result.insertedIds}`;
}
