require('./tasks/watch');
require('./tasks/css');
require('./tasks/js');
require('./tasks/svg');

var gulp = require('gulp');

gulp.task('build', ['js', 'css', 'svg']);

gulp.task('default', ['build']);
