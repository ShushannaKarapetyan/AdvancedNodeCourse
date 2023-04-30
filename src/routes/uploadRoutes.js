const requireLogin = require('../middlewares/requireLogin');
const {upload} = require('../controllers/ImagesController');

module.exports = app => {
    app.get('/api/upload', requireLogin, upload)
}