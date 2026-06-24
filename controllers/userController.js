const User = require('../models/userModel');
// CREATE
exports.createUser = async (req, res) => {
  console.log("-> userController -> createUser");
  const { username, email, password, profile_image, phone_number } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ status: false, message: 'All fields required' });
  }


  const alredythere = await User.findOne({ email });
  if (alredythere) {
    return res.status(400).send({ status: false, message: 'User Already exists' });
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

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).send({ status: true, message: 'User Added successfully', userResponse });
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  console.log("-> userController -> getUsers");
  const users = await User.find();
  res.status(200).send({ status: true, datas: users });
};

// GET ONE USER BY ID
exports.getUserById = async (req, res) => {
  console.log("-> userController -> getUserById");
  const id = req.params.id || req.query.id;

  if (!id) {
    return res.status(400).send({ status: false, message: 'ID is required' });
  }

  const query = !isNaN(id) ? { id: Number(id) } : { _id: id };

  try {
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).send({ status: false, message: 'User not found' });
    }
    res.status(200).send({ status: true, user });
  } catch (error) {
    res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  console.log("-> userController -> updateUser");
  const id = req.params.id || req.query.id;
  if (!id) {
    return res.status(400).send({ status: false, message: 'ID is required' });
  }

  try {
    const user = await User.findOneAndUpdate({ id: id }, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ status: false, message: 'User not found' });
    }
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).send({ status: true, userResponse });
  } catch (error) {
    res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  console.log("-> userController -> deleteUser");
  const id = req.params.id || req.query.id;
  if (!id) {
    return res.status(400).send({ status: false, message: 'ID is required' });
  }
  try {
    const user = await User.findOneAndDelete({ id: id });
    if (!user) {
      return res.status(404).send({ status: false, message: 'User not found' });
    }
    res.status(200).send({ status: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
  }
}; 