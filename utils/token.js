const jwt = require('jsonwebtoken');

const SECRET = 'your_secret_key_here';

const generateToken = (user) => {
    return jwt.sign({
        id: user.id, email: user.email
    }, SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
}

module.exports = {
    generateToken, verifyToken,
}