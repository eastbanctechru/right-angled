var gulp = require('gulp');
var typedoc = require('gulp-typedoc');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');

gulp.task('clean-docs', function() {
  return gulp.src([paths.docs]).pipe(vinylPaths(del));
});

gulp.task('build-docs', function () {
    return gulp
        .src(paths.source)
        .pipe(typedoc({
            module: "es6",
            target: "es6",
            includeDeclarations: false,
            experimentalDecorators: true,
            out: paths.docs,
            mode: "file",
            name: "right-angled",
            readme: "none",
            ignoreCompilerErrors: false,
            help: true
        }));
});

gulp.task('docs', function (callback) {
    return runSequence(
        'clean-docs',
        'build-docs',
        callback
    );
});