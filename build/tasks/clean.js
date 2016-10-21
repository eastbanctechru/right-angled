var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('clean', function() {
  return gulp.src([paths.coverage, paths.compiled, '.publish', 'src/**/*.metadata.json', 'src/**/*.d.ts', 'src/**/*.js'])
    .pipe(vinylPaths(del));
});
