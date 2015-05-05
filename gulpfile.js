/**
 * ----------------------------------------------------------------------------
 * Deps
 * ----------------------------------------------------------------------------
 */

var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var path = require("path");
var uglify = require('gulp-uglify');
var glob = require('glob');
var grunt = require('gulp-grunt')(gulp);
var concat = require('gulp-concat');
var _ = require("underscore");
var gutil = require("gulp-util");
var rename = require("gulp-rename");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var transform = require('vinyl-transform');


/**
 * ----------------------------------------------------------------------------
 * Icons
 * ----------------------------------------------------------------------------
 *
 * This is a grunt task. The gulp-grunt bridge lets us run these with a grunt-
 * prefix, so grunt-clean would run clean from your Gruntfile.
 *
 * mind === blown
 *
 * [ grunt ] --> [ files ] --> [ grunt-icon-pigment ] --> [ dest ]
 *
 */

gulp.task('icon',  function() {
    gulp.run('grunt-icon');
});


require('./gulp/js');
require('./gulp/css');


gulp.task("build", ['jsbuild', 'css', 'icon'], function() {

});

gulp.task('default', ['build'], function(done) {
    done();
});
