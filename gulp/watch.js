var gulp = require("gulp");
var config = require("./config");
var path = require("path");

var livereload = require('gulp-livereload');



gulp.task("watch", ['js'], function() {
    livereload.listen(config.livereloadOptions.port); // install Chrome livereload plugin :)
    gulp.watch(path.join( config.paths.sass, "**", "*.scss"), ["css"]);
    gulp.watch(path.join( config.paths.jsSrc, "**", "*.{js,jsx}"), ["js"]);
    gulp.watch(path.join( config.paths.js, "**", "*.css"), ["livereload_js"]);
    gulp.watch(path.join( config.paths.css, "**", "*.css"), ["livereload_css"]);
});




/* live reload compiled assets */

gulp.task('livereload_js', function (done) {

    gulp.src(path.join(config.paths.js, "**", "*.js"))
        .pipe(livereload())
    ;
    done();

});

gulp.task('livereload_css', function (done) {

    gulp.src(path.join(config.paths.css, "**", "*.css"))
        .pipe(livereload())
    ;
    done();

});
