const mongoose = require("mongoose");
const keys = require("./keys");

module.exports = () => {
    mongoose.Promise = global.Promise;

    mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('error', (error) => {
        console.error('error', error);
    });
}