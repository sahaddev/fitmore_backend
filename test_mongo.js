const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fitmore')
  .then(async () => {
    const Address = require('./models/addressModel');
    console.log(await Address.find({}));
    process.exit(0);
  });
