const mongoose = require('mongoose');
const Order = require('./models/orderModel');
const Address = require('./models/addressModel');
const Product = require('./models/productModel');
const Cart = require('./models/cartModel');

mongoose.connect('mongodb://127.0.0.1:27017/mydb').then(async () => {
    const carts = await Cart.find().limit(1);
    console.log("Cart sample:", JSON.stringify(carts, null, 2));
    const products = await Product.find().limit(1);
    console.log("Product sample:", JSON.stringify(products, null, 2));
    const addresses = await Address.find().limit(1);
    console.log("Address sample:", JSON.stringify(addresses, null, 2));
    mongoose.connection.close();
}).catch(console.error);
