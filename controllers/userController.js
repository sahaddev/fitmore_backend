const User = require('../models/userModel');
// CREATE
exports.createUser = async (req, res) => {
  const { username, email, password, profile, phonenumber } = req.body;

  if (!username || !email || !password || !profile || !phonenumber) {
    return res.send({ status: false, message: 'All fields required' });
  }

  const user = await User.create({
    id: User.length + 1,
    username,
    email,
    password,
    profile,
    phonenumber
  });


  res.send({ status: true, message: 'User Added successfully', user });
};

// GET ALL
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.send({ status: true, data: users });
};

// GET ONE
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('User not found');

  res.send({ status: true, user });

};

// UPDATE
exports.updateUser = async (req, res) => {

  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.send(user);
};

// DELETE
exports.deleteUser = (req, res) => {
  const user = User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.send('Deleted successfully');
};