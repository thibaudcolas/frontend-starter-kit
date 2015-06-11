var gulp = require('gulp');
var config = require('./config');
var path = require('path');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var babelify = require('babelify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var prod = process.env.NODE_ENV === 'production';
var browserifyInstance = prod ? browserify : browserifyInc;

var bundler = browserifyInstance({
    cache: {},
    transform: [babelify, reactify],
    packageCache: {},
    debug: !prod,
    fullPaths: !prod
});

bundler.add(path.resolve(config.paths.jsSrc, config.paths.appName));

gulp.task('js', function(done) {
    return bundler.bundle()
        .on('error', function handleError(err) {
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source(config.paths.appName))
        .pipe(buffer())
        .pipe(prod ? uglify() : gutil.noop())
        .pipe(gulp.dest(config.paths.js))
        .pipe(livereload());
});

