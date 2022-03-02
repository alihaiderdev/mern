// const client = require('../server');

exports.createUser = async (req, res) => {
  try {
    await client.db('techzone').collection('users').insertOne(req.body);
    console.log(req.body);
    res.status(201).json({ status: 'success', data: req.body });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ status: 'error', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let data = await client.db('techzone').collection('users').find();
    const users = await data.toArray();
    res
      .status(200)
      .json({ status: 'success', data: { count: users.length, users } });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ status: 'error', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.userId;
  try {
    if (ObjectId.isValid(id)) {
      let user = await client
        .db('techzone')
        .collection('users')
        .findOne({ _id: ObjectId(id) });
      if (user !== null) {
        res.status(200).json({ status: 'success', data: { user } });
      } else {
        res.status(404).json({
          status: 'error',
          data: { msg: `User with this id: ${id} not exist in database` },
        });
      }
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ status: 'error', error: error.message });
  }
};

// upsert in mongodb: if document exist in collection then update and if its not then first create and then update it at a time
exports.updateUserById = async (req, res) => {
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
      const user = await client
        .db('techzone')
        .collection('users')
        .findOne({ _id: ObjectId(id) });
      res.status(200).json({ status: 'success', data: { user } });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ status: 'error', error: error.message });
  }
};

exports.removeUserById = async (req, res) => {
  const id = req.params.userId;
  try {
    if (ObjectId.isValid(id)) {
      await client
        .db('techzone')
        .collection('users')
        .deleteOne({ _id: ObjectId(id) });
      res.status(200).json({
        status: 'success',
        data: {
          msg: `Document with this id: '${id}' deleted successfully`,
        },
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ status: 'error', error: error.message });
  }
};
