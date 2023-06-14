jest.setTimeout(30000);

require('dotenv').config();
require('../models/User');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connectDB = require('../../config/database/mongodb');

connectDB()
    .then(() => {
        console.log('Testing: Connected to the db.');
    })
    .catch((error) => {
        throw error;
    });
