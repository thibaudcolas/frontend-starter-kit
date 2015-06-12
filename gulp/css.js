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
var path = require('path');

var sass = require('gulp-sass');
var plz = require("gulp-pleeease");
var scsslint = require('gulp-scss-lint');
var parker = require('gulp-parker');


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



/**
 * ----------------------------------------------------------------------------
 * CSS reporter
 * ----------------------------------------------------------------------------
 */

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