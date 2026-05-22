const { verifyToken } = require('../utils/token');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            status: false,
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).send({
            status: false,
            message: 'Invalid token'
        });
    }
};