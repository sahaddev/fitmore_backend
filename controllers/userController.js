const User = require('../models/userModel');
// CREATE
exports.createUser = async (req, res) => {
  const { username, email, password, profile_image, phone_number } = req.body;

  if (!username || !email || !password) {
    return res.send({ status: false, message: 'All fields required' });
  }

  const user = await User.create({
    id: User.length + 1,
    username: username,
    email: email,
    password: password,
    profile_image: profile_image || null,
    phonenumber: phone_number || null,
    ordersCount: 0,
    active: true,
    created_at: new Date().toISOString(),
  });


  res.send({ status: true, message: 'User Added successfully', user });
};

// GET ALL
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.send({ status: true, datas: users });
};

// GET ONE
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send({ status: false, message: 'User not found' });

  res.send({ status: true, user });

};

// UPDATE
exports.updateUser = async (req, res) => {

  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    return res.status(404).send({ status: false, message: 'User not found' });
  }
  res.send({ status: true, user });
};

// DELETE
exports.deleteUser = (req, res) => {
  const user = User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send({ status: false, message: 'User not found' });
  }
  res.send({ status: true, message: 'Deleted successfully' });
};