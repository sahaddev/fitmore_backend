let Products = require("../models/productModel");

//Create
exports.createProduct = (req, res) => {
    const { title, description, image1, image2, image3, image4, price, category, active, productCount, sub_title } = req.body;
    if (!title || !description || !price || !image1 || !image2 || !image3 || !image4 || !category || !active || !productCount || !sub_title) {
        return res.send({ status: false, message: 'All fields required' });
    }
    const product = {
        id: Products.length + 1,
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
    };
    Products.push(product);
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
exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = Products.find(p => p.id === id);
    if (!product) return res.send({ status: false, message: 'product not found' });
    res.send({ status: true, product });
}
//updateProduct
exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);

    const { title, description, image1, image2, image3, image4, price, category, active, productCount } = req.body;

    const product = Products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send({ status: false, message: 'product not found' });
    }
    if (title) product.title = title;
    if (description) product.description = description;
    if (sub_title) product.sub_title = sub_title;
    if (image1) product.image1 = image1;
    if (image2) product.image2 = image2;
    if (image3) product.image3 = image3;
    if (image4) product.image4 = image4;
    if (price) product.price = price;
    if (category) product.category = category;
    if (active) product.active = active;
    if (productCount) product.productCount = productCount;
    res.send({ status: true, message: 'Successfully updated', product })
}
exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = Products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.send({ status: false, message: 'product not found' });
    }
    Products.splice(index, 1);
    return res.send({ status: true, message: 'delete successfully' });

}

