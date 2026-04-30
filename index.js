const express = require('express');
const app = express();

app.use(express.json());

// import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const couponRoutes = require('./routes/couponRoutes');
const addressRoutes = require('./routes/addressRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', couponRoutes);
app.use('/api', addressRoutes);
app.use('/api', authRoutes);

const connectDB = require('./config/db');

app.get('/', (req, res) => {
    res.send('Hello from fitmore server');
});

connectDB();

app.listen(3000, () => {
    console.log('server running on 3000 port');
});