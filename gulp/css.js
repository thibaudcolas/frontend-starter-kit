/**
 * ----------------------------------------------------------------------------
 * CSS
 * ----------------------------------------------------------------------------
 *
 * [ files ] --> [ Sass ] --> [ Pleeease ] --> [ Dest ]
 *
 */

var config = require("./config");
var gulp = require('gulp');
var sass = require('gulp-sass');
var plz = require("gulp-pleeease");
var scsslint = require('gulp-scss-lint');
var path = require('path');

gulp.task('css', function (done) {

    var pleeeaseOptions = {
        minifier: process.env.NODE_ENV === 'production',
        mqpacker: false,
        sourcemaps: false,
        autoprefixer: true,
        filters: false,
        rem: true,
        pseudoElements: true,
        opacity: true
    };

    gulp.src(path.join('./core/static_src/sass/', '**', "*.scss"))
        .pipe(sass({
            sourceComments: 'none'
        }))
        .pipe(plz( pleeeaseOptions ))
        .pipe(gulp.dest('./core/static/assets/'));


    done();
});


/**
 * ----------------------------------------------------------------------------
 * Watching
 * ----------------------------------------------------------------------------
 */

gulp.task("watch", function() {
    gulp.watch(path.join( config.paths.src, "sass/**/*.scss"), ["css"]);
    gulp.watch(path.join( config.paths.src, "**/*.js"), ["js"]);
    gulp.watch(path.join( config.paths.src, "svg/**/*.svg"), ["icon"]);
});


/**
 * ----------------------------------------------------------------------------
 * Scss lint
 * ----------------------------------------------------------------------------
 */

gulp.task('lint:sass', function() {
  gulp.src( './core/static_src/sass/**/*.scss' )
    .pipe(scsslint())
    .pipe(scsslint.failReporter());
});


