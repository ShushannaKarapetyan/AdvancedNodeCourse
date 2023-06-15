const express = require('express');
const app = express();

module.exports = (req, res, next) => {
    if (['production', 'ci'].includes(process.env.NODE_ENV)) {
        app.use(express.static('./client/build'));

        const path = require('path');

        app.get('*', (req, res) => {
            res.sendFile(path.resolve('client', 'build', 'index.html'));
        });
    }

    next();
};
