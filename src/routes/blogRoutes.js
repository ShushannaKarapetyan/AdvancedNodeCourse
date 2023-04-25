const requireLogin = require('../middlewares/requireLogin');
const cleanCache = require('../middlewares/cleanCache');
const {getBlog, getBlogs, createBlog} = require('../controllers/BlogsController')

module.exports = app => {
    app.get('/api/blogs/:id', requireLogin, getBlog);

    app.get('/api/blogs', requireLogin, getBlogs);

    app.post('/api/blogs', requireLogin, cleanCache, createBlog);
};
