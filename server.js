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
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

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

// app.post('/api/users', async (req, res) => {
//   try {
//     await create(client, 'techzone', 'users', req.body);
//     console.log(req.body);
//     res.status(201).json({ msg: 'Success', data: req.body });
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     res.status(404).json({ msg: error.message });
//   }
// });

app.post('/api/users', async (req, res) => {
  try {
    await client.db('techzone').collection('users').insertOne(req.body);
    console.log(req.body);
    res.status(201).json({ msg: 'Success', data: req.body });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ msg: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    let data = await client.db('techzone').collection('users').find();
    const users = await data.toArray();
    res
      .status(201)
      .json({ msg: 'Success', data: { count: users.length, users } });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ msg: error.message });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  const id = req.params.userId;
  try {
    if (ObjectId.isValid(id)) {
      let user = await client
        .db('techzone')
        .collection('users')
        .findOne({ _id: ObjectId(id) });
      res.status(201).json({ msg: 'Success', data: { user } });
      // console.log(
      //   ObjectId.isValid('microsoft123'),
      //   ObjectId.isValid('timtomtamted'),
      //   ObjectId.isValid('551137c2f9e1fac808a5f579')
      // );
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ msg: error.message });
  }
});

// upsert in mongodb: if document exist in collection then update and if its not then first create and then update it at a time
app.patch('/api/users/:userId', async (req, res) => {
  const id = req.params.userId;
  try {
    if (ObjectId.isValid(id)) {
      const { firstName, lastName, email, password } = req.body;
      await client
        .db('techzone')
        .collection('users')
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: req.body,
          }
        );
      const updatedUser = await client
        .db('techzone')
        .collection('users')
        .findOne({ _id: ObjectId(id) });
      res.status(201).json({ msg: 'Success', data: { user: updatedUser } });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ msg: error.message });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  const id = req.params.userId;
  try {
    if (ObjectId.isValid(id)) {
      await client
        .db('techzone')
        .collection('users')
        .deleteOne({ _id: ObjectId(id) });
      res.status(201).json({
        msg: 'Success',
        data: {
          delete: `Document with this id: '${id}' deleted successfully`,
        },
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ msg: error.message });
  }
});

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
