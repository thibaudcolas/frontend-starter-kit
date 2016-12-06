const gulp = require('gulp');

require('./tasks/watch');
require('./tasks/css');
require('./tasks/js');
require('./tasks/svg');

gulp.task('build', ['js', 'css', 'svg']);

gulp.task('default', ['build']);
