const mongoose = require("mongoose");
const keys = require("../keys");

module.exports = () => {
    return mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};