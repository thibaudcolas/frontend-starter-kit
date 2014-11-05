var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');

// set minifier to false to keep Sass sourcemaps support
var PleeeaseOptions = {
    minifier: false,
    mqpacker: true,
    sourcemaps: false,
    autoprefixer: true,
    filters: true,
    rem: true,
    pseudoElements: true,
    opacity: true
};

gulp.task('css', function () {
    gulp.src('./sass/screen.scss')
        .pipe(sass())
        .pipe(pleeease(PleeeaseOptions))
        .pipe(gulp.dest('./css'));
});