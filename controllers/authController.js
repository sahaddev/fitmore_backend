const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

let users = [];

exports.register = async (req, res) => {
    const { username, email, password, phonenumber } = req.body;
    if (!username || !email || !password || !phonenumber) {
        return res.send({ status: false, message: 'All fields required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        phonenumber
    };
    users.push(user);
    // remove password safely
    const { password: _, ...userWithoutPassword } = user;

    res.send({ status: true, message: 'User Added successfully', userWithoutPassword });
}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send({ status: false, message: 'email and password are required' });
    }
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.send({ status: false, message: 'user not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send({ status: false, message: 'invalid Token' });
    }
    const token = generateToken(user);
    return res.send({ status: true, message: 'user login successfully', token: token });

}