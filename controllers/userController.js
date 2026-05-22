const User = require('../models/userModel');
// CREATE
exports.createUser = async (req, res) => {
  const { username, email, password, profile_image, phone_number } = req.body;

  if (!username || !email || !password) {
    console.log('createUser status: false');
    return res.send({ status: false, message: 'All fields required' });
  }

  const userCount = await User.countDocuments();
  const user = await User.create({
    id: userCount + 1,
    username: username,
    email: email,
    password: password,
    profile_image: profile_image || null,
    phone_number: phone_number || null,
    ordersCount: 0,
    active: true,
    created_at: new Date().toISOString(),
  });


  console.log('createUser status: true');
  res.send({ status: true, message: 'User Added successfully', user });
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  const users = await User.find();
  console.log('getUsers status: true');
  res.send({ status: true, datas: users });
};

// GET ONE USER BY ID
exports.getUserById = async (req, res) => {
  const id = req.params.id || req.query.id;

  if (!id) {
    console.log('getUserById status: false');
    return res.status(400).send({ status: false, message: 'ID is required' });
  }

  const query = !isNaN(id) ? { id: Number(id) } : { _id: id };

  try {
    const user = await User.findOne(query);
    if (!user) {
      console.log('getUserById status: false');
      return res.status(404).send({ status: false, message: 'User not found' });
    }
    console.log('getUserById status: true');
    res.send({ status: true, user });
  } catch (error) {
    console.log('getUserById status: false');
    res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOneAndUpdate(id, req.body, { new: true });
    if (!user) {
      console.log('updateUser status: false');
      return res.status(404).send({ status: false, message: 'User not found' });
    }
    console.log('updateUser status: true');
    res.send({ status: true, user });
  } catch (error) {
    console.log('updateUser status: false');
    res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete(id);
    if (!user) {
      console.log('deleteUser status: false');
      return res.status(404).send({ status: false, message: 'User not found' });
    }
    console.log('deleteUser status: true');
    res.send({ status: true, message: 'Deleted successfully' });
  } catch (error) {
    console.log('deleteUser status: false');
    res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
  }
}; 