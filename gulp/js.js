var gulp = require("gulp");
var config = require("./config");
var path = require('path');
var browserifyInc = require('browserify-incremental');
var babelify = require('babelify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var source = require("vinyl-source-stream");
var livereload = require('gulp-livereload');

var bundler = browserifyInc({
    cache: {},
    transform: [babelify, reactify],
    packageCache: {},
    debug: true,
    fullPaths: true
});

bundler.add(path.resolve(config.paths.jsSrc, config.paths.appName));

gulp.task('js', function(done) {
    bundler.bundle()
        .on('error', function handleError(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source( config.paths.appName ))
        .pipe(buffer())
        .pipe(process.env.NODE_ENV === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest( config.paths.js ))
        .on('end', done)
        .pipe(livereload());
});

