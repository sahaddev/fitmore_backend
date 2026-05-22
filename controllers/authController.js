const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const User = require('../models/userModel');


exports.register = async (req, res) => {
    const { username, email, password, phonenumber } = req.body;
    if (!username || !email || !password || !phonenumber) {
        return res.send({ status: false, message: 'All fields required' });
    }

    const alredythere = await User.findOne({ email });
    if (alredythere) {
        return res.send({ status: false, message: 'User Already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await User.countDocuments();
    const user = await User.create({
        id: userCount + 1,
        username: username,
        email: email,
        password: hashedPassword,
        phone_number: phonenumber,
        ordersCount: 0,
        active: true,
        created_at: new Date().toISOString(),
    });
    // remove password safely
    const { password: _, ...userWithoutPassword } = user;

    res.send({ status: true, message: 'User Added successfully', userWithoutPassword });
}


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // check empty fields
        if (!email || !password) {
            return res.send({
                status: false,
                message: 'Email and password are required'
            });
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.send({
                status: false,
                message: 'Please enter a valid email'
            });
        }

        // find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.send({
                status: false,
                message: 'User not found'
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.send({
                status: false,
                message: 'Invalid password'
            });
        }

        // generate token
        const token = generateToken(user);

        return res.send({
            status: true,
            message: 'User login successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {

        console.log(error);

        return res.send({
            status: false,
            message: 'Server Error'
        });
    }
};