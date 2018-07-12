var express      = require('express'),
		router       = express.Router(),
		Blog         = require('../models/blog'),
		middleWare   = require('../middleware/middleware'),
		moment       = require('moment');


// INDEX ROUTE
router.get('/blogs', function(req, res) {
	res.redirect('/blogs/page-1');
});

// PAGES ROUTE
router.get('/blogs/page-:page', function(req, res) {
	Blog.paginate({}, {sort: {createdAt: -1}, page: req.params.page, limit: 5}, function(err, blogs) {
			if (err || !blogs.docs.length) {
				req.flash('error', 'The page you are looking for doesn\'t exist');
				res.redirect('/blogs/page-1');
			} else {
				res.render('blogs/blogs', {blogs: blogs});
			}
	});
});

// NEW ROUTE
router.get('/blogs/new', function(req, res) {
	res.render('blogs/new');
});

// CREATE ROUTE
router.post('/blogs', middleWare.isAdmin, function(req, res) {
	var title = req.body.title,
			category = req.body.category,
			image = req.body.image,
			body = req.body.body,
			author = {
				id: req.user._id,
				username: req.user.username
			};
	var newBlog = {title: title, category: category, image: image, body: body, author: author};

	Blog.create(newBlog, function(err) {
		if (err) {
			res.render('blogs/new');
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	});
});

// SHOW ROUTE
router.get('/blogs/:id', function(req, res) {
	Blog.findById(req.params.id)
	.populate('comments')
	.exec(function(err, showBlogPost) {
		if (err) {
			req.flash('error', 'Oops! Something went wrong, or the post is gone! :)');
			res.redirect('/blogs');
		}
	Blog.find()
		.sort({createdAt: -1})
		.limit(3)
		.exec(function(err, nextBlogs) {
			if (err) {
				res.redirect('/blogs');
			} else {
				res.render('blogs/show', {blog: showBlogPost, nextBlogs: nextBlogs, moment: moment});
			}
		});
	});
});

// EDIT ROUTE
router.get('/blogs/:id/edit', middleWare.isAdmin, function(req, res) {
	Blog.findById(req.params.id, function(err, blogPost) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('blogs/edit', {blog: blogPost});
		}
	});
});

// UPDATE ROUTE
router.put('/blogs/:id', middleWare.isAdmin, function(req, res) {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlogPost) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

// DELETE ROUTE
router.delete('/blogs/:id', middleWare.isAdmin, function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

module.exports = router;