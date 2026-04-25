const jwt = require('jsonwebtoken');

const SECRET = 'mysecretkey';

exports.generateToken = (user) => {
    return jwt.sign({
        id: user.id, email: user.email
    }, SECRET);
};

exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET);
}