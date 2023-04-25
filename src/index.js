const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('../config/keys');
const checkEnvironment = require('./middlewares/checkEnvironment');
const connection = require('../config/connection');
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

app.use(checkEnvironment);

app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);

    connection();
});
