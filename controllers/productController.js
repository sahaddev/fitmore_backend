let products = [];

//Create
exports.createProduct = (req, res) => {
    const { title, description, image1, image2, image3, image4, price, category, active, productCount } = req.body;
    if (!title || !description || !price || !image1 || !image2 || !image3 || !image4 || !category || !active || !productCount) {
        return res.send('All fields required');
    }
    const product = {
        id: products.length + 1,
        title,
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
    products.push(product);
    res.send({ message: "Product Added successfully" });
}
// Get All
exports.getProducts = (req, res) => {
    res.send(products);
};
// get single product 
exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.send('product not found');
    res.send(product);
}
//updateProduct
exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);

    const { title, description, image1, image2, image3, image4, price, category, active, productCount } = req.body;

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send({ status: false, message: 'product not found' });
    }
    if (title) product.title = title;
    if (description) product.description = description;
    if (image1) product.image1 = image1;
    if (image2) product.image2 = image2;
    if (image3) product.image3 = image3;
    if (image4) product.image4 = image4;
    if (price) product.price = price;
    if (category) product.category = category;
    if (active) product.active = active;
    if (productCount) product.productCount = productCount;
    res.send({ status: true, message: 'Successfully updated' })
}
exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.send({ status: false, message: 'fail to delete' });
    }
    products.splice(index, 1);
    return res.send({ status: true, message: 'delete successfully' });

}

