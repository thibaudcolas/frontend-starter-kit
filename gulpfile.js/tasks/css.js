// ----------------------------------------------------------------------------
// CSS
// ----------------------------------------------------------------------------

var config = require("../config");
var gulp = require('gulp');
var path = require('path');

var sass = require('gulp-sass');
var gutil = require('gulp-util');
var plz = require("gulp-pleeease");
var sassLint = require('gulp-sass-lint');
var parker = require('gulp-parker');
var bs = require('browser-sync').get('main');
var sourcemaps = require('gulp-sourcemaps');
var critical = require('critical');

var prod = process.env.NODE_ENV === 'production';

gulp.task('css', function() {
    return gulp.src(path.join( config.paths.sass, '**', "*.scss" ), {base: config.paths.sass})
        .pipe(prod ? gutil.noop() : sourcemaps.init())
            .pipe(sass())
            .on('error', function handleError(err) {
                gutil.log(err.message);
                bs.notify(err.message, 10000);
                this.emit('end');
            })
            .pipe(plz( config.PlzOptions ))
        .pipe(prod ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest( config.paths.css ))
        .pipe(bs.stream());
});


// ----------------------------------------------------------------------------
// Sass Lint
// ----------------------------------------------------------------------------

gulp.task('lint:sass', function() {
  gulp.src( path.join(config.paths.sass, '**', '*.scss') )
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});


// ----------------------------------------------------------------------------
// Critical CSS
// ----------------------------------------------------------------------------

gulp.task('critical:css', function (cb) {
    critical.generate({
        inline: true,
        base: 'core',
        src: 'templates/index.html',
        css: 'static/css/screen.css',
        dest: 'dist/index-critical.html',
        minify: true,
        ignore: ['@font-face', /url\(/, /djDebug/],
        dimensions: [{
            width: 375,
            height: 600
        }, {
            width: 1400,
            height: 1200
        }]
    });
});



// ----------------------------------------------------------------------------
// CSS Reporter
// ----------------------------------------------------------------------------

gulp.task('report:css', function() {
    return gulp.src( path.join(config.paths.css, '**', '*.css') )
        .pipe(parker({
            file: path.join(config.paths.css, 'css-report.md'),
            title: 'Gulp test report',
            metrics: [
                'TotalStylesheets',
                'TotalStylesheetSize',
                'TotalRules',
                'TotalSelectors',
                'TotalIdentifiers',
                'TotalDeclarations',
                'SelectorsPerRule',
                'IdentifiersPerSelector',
                'SpecificityPerSelector',
                'TopSelectorSpecificity',
                'TopSelectorSpecificitySelector',
                'TotalIdSelectors',
                'TotalUniqueColours',
                'TotalImportantKeywords',
                'TotalMediaQueries'
            ]
        })
    );
});
