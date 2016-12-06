var config = require('../config');
var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var size = require('gulp-size');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

gulp.task('svg', function() {
    return gulp
        .src(path.join(config.paths.svg, '**', '*.svg'))
        .pipe(rename({ prefix: 'i-' }))
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(rename('svg.html'))
        .pipe(size({ title: 'SVG', gzip: config.prod }))
        .pipe(gulp.dest(config.paths.views));
});
