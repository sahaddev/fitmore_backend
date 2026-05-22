let Products = require("../models/productModel");

//Create
exports.createProduct = async (req, res) => {
    const { title, description, image1, image2, image3, image4, price, category, active, productCount, sub_title } = req.body;
    if (!title || !description || !price || !image1 || !image2 || !image3 || !image4 || !category || !active || !productCount || !sub_title) {
        return res.send({ status: false, message: 'All fields required' });
    }
    const count = await Products.countDocuments();
    const product = await Products.create({
        id: count + 1,
        title,
        sub_title,
        description,
        image1,
        image2,
        image3,
        image4,
        price,
        category,
        active,
        productCount
    });
    res.send({ status: true, message: "Product Added successfully" });
}
// Get All
exports.getProducts = async (req, res) => {
    const products = await Products.find();
    res.send({
        status: true,
        datas: products
    });
};
// get single product 
exports.getProductById = async (req, res) => {
    const id = req.params.id || req.query.id;

    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }
    const query = !isNaN(id) ? { id: Number(id) } : { _id: id };
    try {
        const product = await Products.findOne(query);
        if (!product) return res.send({ status: false, message: 'product not found' });
        res.send({ status: true, product });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or User not found' });
    }

}
//updateProduct
exports.updateProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Products.findOneAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).send({ status: false, message: 'product not found' });
        }
        res.send({ status: true, product });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or product not found' });
    }
}
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Products.findOneAndDelete(id);
        if (!product) {
            return res.status(404).send({ status: false, message: 'product not found' });
        }
        res.send({ status: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or product not found' });
    }

}

