var gulp = require('gulp');
var paths = require('../paths');
var tslint = require('gulp-tslint');

gulp.task('tslint', function () {
  return gulp.src(paths.source.concat(paths.tests))
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});