let users = [];

// CREATE
exports.createUser = (req, res) => {
  const { username, email, password, profile, phonenumber } = req.body;

  if (!username || !email || !password || !profile || !phonenumber) {
    return res.send({ status: false, message: 'All fields required' });
  }

  const user = {
    id: users.length + 1,
    username,
    email,
    password,
    profile,
    phonenumber
  };

  users.push(user);

  res.send({ message: 'User Added successfully', user });
};

// GET ALL
exports.getUsers = (req, res) => {
  res.send(users);
};

// GET ONE
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) return res.send('User not found');

  res.send(user);
};

// UPDATE
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email, password, profile, phonenumber } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (profile) user.profile = profile;
  if (phonenumber) user.phonenumber = phonenumber;

  res.send({ message: 'Updated', user });
};

// DELETE
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).send('User not found');
  }

  users.splice(index, 1);

  res.send('Deleted successfully');
};