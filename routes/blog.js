var express      = require('express'),
		router       = express.Router(),
		Blog         = require('../models/blog'),
		middleWare   = require('../middleware/middleware'),
		moment       = require('moment'),
		sanitizeHtml = require('sanitize-html');

// ALL BLOGS ROUTE
router.get('/blogs', function(req, res) {
	Blog.find()
		.sort({createdAt: -1})
		.exec(function(err, blogs) {
			if (err) {
				console.log('ERROR!');
			} else {
				res.render('blogs/blogs', {blogs: blogs});
			}
	});
});

// NEW ROUTE
router.get('/blogs/new', middleWare.isAdmin, function(req, res) {
	res.render('blogs/new');
});

// CREATE ROUTE
router.post('/blogs', middleWare.isAdmin, function(req, res) {
	var title = req.body.title,
			category = req.body.category,
			image = req.body.image,
			body = sanitizeHtml(req.body.body, {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
			}),
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
	Blog.findById(req.params.id).populate('comments').exec(function(err, showBlogPost) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('blogs/show', {blog: showBlogPost, moment: moment});
		}
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
	req.body.blog.body = sanitizeHtml(req.body.blog.body, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
	});
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