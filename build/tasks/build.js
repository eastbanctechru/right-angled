var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var gulpTypescript = require('gulp-typescript');
var merge = require('merge2');

gulp.task('build-commonjs', function () {
    var options = require('../../tsconfig.json').compilerOptions;
    var srcResult = gulp.src(paths.source).pipe(gulpTypescript(options));
    var indexResult = gulp.src('index.ts').pipe(gulpTypescript(options));
    return merge([
        srcResult.dts.pipe(gulp.dest('src/')),
        srcResult.js.pipe(gulp.dest('src/')),
        indexResult.dts.pipe(gulp.dest('./')),
        indexResult.js.pipe(gulp.dest('./'))
    ]);
});

gulp.task('build', function (callback) {
    return runSequence(
        [
            'clean',
            'build-commonjs'
        ],
        callback
    );
});