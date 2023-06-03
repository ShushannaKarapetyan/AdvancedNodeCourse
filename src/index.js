require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('../config/keys');
const checkEnvironment = require('./middlewares/checkEnvironment');
const connectDB = require('../config/database/mongodb');
const PORT = process.env.PORT || 5001;

require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/uploadRoutes')(app);

app.use(checkEnvironment);

connectDB()
    .then(() => {
        console.log('Connected to the db.');

        connectServer();
    })
    .catch((error) => {
        throw error;
    });

function connectServer() {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}
