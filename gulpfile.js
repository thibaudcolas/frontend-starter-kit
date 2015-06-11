var gulp = require("gulp");

require("./gulp/js");
require("./gulp/css");
require("./gulp/svg");
require("./gulp/watch");


gulp.task('build', ['js', 'css', 'svg'], function(done) {
    done();
});

gulp.task('default', ['build']);