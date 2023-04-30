const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const HttpStatus = require('http-status-codes');

async function getBlog(req, res, next) {
    try {
        const blog = await Blog.findOne({
                _id: req.params.id,
                _user: req.user.id
            },
        );

        if (!blog) {
            throw new Error('Not found');
        }

        res.status(HttpStatus.OK).send(blog);
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
}

async function getBlogs(req, res, next) {
    const userId = req.user._id;

    const blogs = await Blog
        .find({_user: userId})
        .cache({key: userId});

    res.status(HttpStatus.OK).send(blogs);
}

async function createBlog(req, res) {
    const {title, content, imageUrl} = req.body;

    const blog = new Blog({
        imageUrl,
        title,
        content,
        _user: req.user._id
    });

    try {
        await blog.save();

        res.status(HttpStatus.CREATED).send(blog);
    } catch (error) {
        throw new Error("Can't create the blog.");
    }
}

module.exports = {
    getBlog,
    getBlogs,
    createBlog,
}