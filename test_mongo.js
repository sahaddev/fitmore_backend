const mongoose = require('mongoose');
const Products = require('./models/productModel');
const connectDB = require('./config/db');
connectDB().then(async () => {
    const products = await Products.find({});
    console.log(products.map(p => ({_id: p._id, id: p.id, title: p.title})));
    process.exit(0);
});
