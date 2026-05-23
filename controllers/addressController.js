let addressList = []


// Create Address
exports.createAddress = (req, res) => {
    const { pincode, city, state, country, buildingName, streetName, area, userId } = req.body;
    if (!pincode || !city || !state || !country || !buildingName || !streetName || !area || !userId) {
        return res.status(400).send({ status: false, message: 'All fields required' })
    }
    const address = {
        id: addressList.length + 1,
        pincode,
        city,
        state,
        country,
        buildingName,
        streetName,
        area,
        userId
    };
    addressList.push(address);
    return res.status(201).send({ status: true, message: 'address created successfully', address })
}

// Get All Addresses
exports.getAddresses = (req, res) => {
    return res.status(200).send({ status: true, data: addressList })
}

// Get Address By ID
exports.getAddressById = (req, res) => {
    const id = parseInt(req.params.id);
    const address = addressList.find(a => a.id === id);
    if (!address) {
        return res.status(404).send({ status: false, message: 'address not found' })
    }
    return res.status(200).send({ status: true, data: address })
}

// Update Address
exports.updateAddress = (req, res) => {
    const id = parseInt(req.params.id);
    const { pincode, city, state, country, buildingName, streetName, area, userId } = req.body;
    const address = addressList.find(a => a.id === id);
    if (!address) {
        return res.status(404).send({ status: false, message: 'address not found' })
    }
    if (pincode) address.pincode = pincode;
    if (city) address.city = city;
    if (state) address.state = state;
    if (country) address.country = country;
    if (buildingName) address.buildingName = buildingName;
    if (streetName) address.streetName = streetName;
    if (area) address.area = area;
    if (userId) address.userId = userId;
    return res.status(200).send({ status: true, message: 'address updated successfully', address })
}

// Delete Address
exports.deleteAddress = (req, res) => {
    const id = parseInt(req.params.id);
    const index = addressList.findIndex(a => a.id === id);
    if (index === -1) {
        return res.status(404).send({ status: false, message: 'address not found' })
    }
    addressList.splice(index, 1);
    return res.status(200).send({ status: true, message: 'address deleted successfully' })
}


