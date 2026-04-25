let addressList = []
exports.createAddress = (req, res) => {
    const { pincode, city, state, country, buildingName, streetName, area, userId } = req.body;
    if (!pincode || !city || !state || !country || !buildingName || !streetName || !area || !userId) {
        return res.send({ status: false, message: 'all fields required' })
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
    return res.send({ status: true, message: 'address created successfully' })
}
exports.getAddresses = (req, res) => {
    return res.send({ status: true, data: addressList })
}
exports.getAddressById = (req, res) => {
    const id = parseInt(req.params.id);
    const address = addressList.find(a => a.id === id);
    if (!address) {
        return res.send({ status: false, message: 'address not found' })
    }
    return res.send({ status: true, data: address })
}
exports.updateAddress = (req, res) => {
    const id = parseInt(req.params.id);
    const { pincode, city, state, country, buildingName, streetName, area, userId } = req.body;
    const address = addressList.find(a => a.id === id);
    if (!address) {
        return res.send({ status: false, message: 'address not found' })
    }
    if (pincode) address.pincode = pincode;
    if (city) address.city = city;
    if (state) address.state = state;
    if (country) address.country = country;
    if (buildingName) address.buildingName = buildingName;
    if (streetName) address.streetName = streetName;
    if (area) address.area = area;
    if (userId) address.userId = userId;
    return res.send({ status: true, message: 'address updated successfully' })
}
exports.deleteAddress = (req, res) => {
    const id = parseInt(req.params.id);
    const index = addressList.findIndex(a => a.id === id);
    if (index === -1) {
        return res.send({ status: false, message: 'address not found' })
    }
    addressList.splice(index, 1);
    return res.send({ status: true, message: 'address deleted successfully' })
}


