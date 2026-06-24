let Address = require("../models/addressModel");

// Create Address
exports.createAddress = async (req, res) => {
    console.log("-> addressController -> createAddress");
    const { pincode, city, state, country, build_name, street_name, area, user_id } = req.body;
    if (!pincode || !city || !state || !country || !build_name || !street_name || !area || !user_id) {
        return res.status(400).send({ status: false, message: 'All fields required' });
    }
    const count = await Address.countDocuments();
    const address = await Address.create({
        id: count + 1,
        pincode,
        city,
        state,
        country,
        build_name,
        street_name,
        area,
        user_id
    });
    res.status(201).send({ status: true, message: "address created successfully", address });
}

// Get All Addresses
exports.getAddresses = async (req, res) => {
    console.log("-> addressController -> getAddresses");
    const userId = req.params.user_id || req.query.user_id;

    let query = {};
    if (userId) {
        query = { user_id: Number(userId) };
    }

    try {
        const addresses = await Address.find(query);
        res.status(200).send({
            status: true,
            datas: addresses
        });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Error fetching addresses' });
    }
};

// Get Address By ID
exports.getAddressById = async (req, res) => {
    console.log("-> addressController -> getAddressById");
    const id = req.params.id || req.query.id;

    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }
    const query = !isNaN(id) ? { id: Number(id) } : { _id: id };
    try {
        const address = await Address.findOne(query);
        if (!address) return res.status(404).send({ status: false, message: 'address not found' });
        res.status(200).send({ status: true, data: address });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or address not found' });
    }
}

// Update Address
exports.updateAddress = async (req, res) => {
    console.log("-> addressController -> updateAddress");
    const id = req.params.id || req.query.id;
    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }

    const query = !isNaN(id) ? { id: Number(id) } : { _id: id };
    try {
        // Remove _id and id from body so we don't try to update immutable fields
        const updateData = { ...req.body };
        delete updateData._id;
        delete updateData.id;

        const address = await Address.findOneAndUpdate(query, updateData, { returnDocument: 'after' });
        if (!address) {
            return res.status(404).send({ status: false, message: 'address not found' });
        }
        res.status(200).send({ status: true, message: 'address updated successfully', address });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or address not found', error: error.message });
    }
}

// Delete Address
exports.deleteAddress = async (req, res) => {
    console.log("-> addressController -> deleteAddress");
    const id = req.params.id || req.query.id || req.body.id || req.body._id;
    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }

    const query = !isNaN(id) ? { id: Number(id) } : { _id: id };
    try {
        const address = await Address.findOneAndDelete(query);
        if (!address) {
            return res.status(404).send({ status: false, message: 'address not found' });
        }
        res.status(200).send({ status: true, message: 'address deleted successfully' });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or address not found' });
    }
}
