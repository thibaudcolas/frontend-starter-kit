var config      = require("./config");
var gulp        = require('gulp');
var gutil       = require("gulp-util");
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require("reactify");
var livereload  = require("gulp-livereload");
var rename      = require("gulp-rename");
var jshint      = require('gulp-jshint');
var path        = require("path");
var uglify      = require("gulp-uglify");
var streamify   = require("gulp-streamify");
var glob        = require("glob");
var jscs        = require("gulp-jscs");
var concat      = require('gulp-concat');

var babelify = require("babelify");

// Main JS entrypoint config
var jsPath          = path.join( __dirname, "..",  "core", "static", "assets", "js");
var jsSrcPath       = path.join( __dirname, "..",  "core", "static_src", "js");
var jsEntryPoint    = path.join( jsSrcPath, "realme.js");
var jsBundleDest    = jsPath;
var jsBundleName    = "realme.js";

// Only need initial file, browserify finds the deps
// We want to convert JSX to normal javascript
// Gives us sourcemapping
// Requirement of watchify
function getBundler(debug) {
    return browserify({
        entries: [jsEntryPoint],
        debug: debug,
        cache: {}, packageCache: {}, fullPaths: debug
    }).transform(babelify)
}

function handleError(err) {
    gutil.log(err.message);
}

/**
 * Bundle browserify entry points
 * @param  {Function} done  Callback executed when all bundles complete
 * @return {[type]}         undefined
 */
gulp.task('js', function() {
    var bundler = getBundler(true);
    var watcher  = watchify(bundler);

    function rebundle (file) {
        var updateStart = Date.now(), elapsed;
        gutil.log('Bundle start');

        if (file) {
           gutil.log(file);
        }

        watcher.bundle()
            .on('error', handleError)
            .pipe(source(jsBundleName))
            .pipe(gulp.dest(jsBundleDest))
            .pipe(livereload());

        elapsed = Date.now() - updateStart;

        gutil.log('Bundled', elapsed + 'ms');
    }

    return watcher
        .on('update', rebundle)
        // Create the initial bundle when starting the task
        .bundle()
        .on('error', handleError)
        .pipe(source(jsBundleName))
        .pipe(gulp.dest(jsBundleDest));
});


gulp.task('lib', function() {
    var libPaths = [
        path.join(config.paths.js, 'lib', '**', '*.js' )
    ];

    return gulp.src(libPaths)
        .pipe(concat('lib.js'))
        .pipe(process.env.NODE_ENV === 'production' ? uglify() : gutil.noop() )
        .pipe(gulp.dest( path.join(config.paths.dist, 'js') ));
});


gulp.task('jsbuild', ['lib'], function() {
    var bundler = getBundler(true);

    bundler.bundle()
        .on('error', handleError)
        .pipe(source(jsBundleName))
        .pipe(buffer())
        .pipe(process.env.NODE_ENV === 'production' ? uglify() : gutil.noop() )
        .pipe(gulp.dest(jsBundleDest));
});




