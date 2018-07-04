var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
		proxy: "http://localhost:3000",
    files: ["views", "public/stylesheets/*.css", "app.js"],
    port: 5000,
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
	var started = false;
	
	return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
		// avoid nodemon being started multiple times
		if (!started) {
			cb();
      started = true; 
		} 
  })
  .on('restart', function () {
    setTimeout(function () {
      browserSync.reload();
    }, 1000);
  });
});

gulp.task('default', ['browser-sync']);