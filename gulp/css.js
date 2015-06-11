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

    gulp.src(path.join( config.paths.sass, '**', "*.scss" ))
        .pipe(sass( {
            errLogToConsole: true,
            sourceComments: false
        } ))
        .pipe(plz( config.PlzOptions ))
        .pipe(gulp.dest( config.paths.css ));

    done();

});



/**
 * ----------------------------------------------------------------------------
 * Scss lint
 * ----------------------------------------------------------------------------
 */

gulp.task('lint:sass', function() {
  gulp.src( path.join(config.paths.sass, '**', '*.scss') )
    .pipe(scsslint())
    .pipe(scsslint.failReporter());
});


