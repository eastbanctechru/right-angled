var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prepublish', function (callback) {
  return runSequence(
    'clean',
    'tslint',
    'build',
    'test-single-run',
    callback
  );
});