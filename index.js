const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const checkEnvironment = require('./middlewares/checkEnvironment');
const connection = require('./config/connection');

require('./models/User');
require('./models/Blog');
require('./services/passport');

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);

    connection();
});
