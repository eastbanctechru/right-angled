var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var paths = require('../paths');
var gulpTypescript = require('gulp-typescript');
var concat = require('gulp-concat');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');

var getES6options = function () {
    var options = require('../../tsconfig.json').compilerOptions;
    options['target'] = 'es6';
    options['module'] = 'es6';
    return options;
}
var getCjsOptions = function () {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'commonjs';
    options['target'] = 'es5';
    return options;
}

gulp.task('build-es6', function () {
    var options = getES6options();
    var srcResult = gulp.src(paths.source).pipe(sourcemaps.init()).pipe(gulpTypescript(options));
    var indexResult = gulp.src('index.ts').pipe(gulpTypescript(options));
    return merge([
        srcResult.dts.pipe(gulp.dest(paths.esmOutput+'src/')),
        srcResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.esmOutput+'src/')),
        indexResult.dts.pipe(gulp.dest(paths.esmOutput)),
        indexResult.js.pipe(gulp.dest(paths.esmOutput))
    ]);
});

gulp.task('build-commonjs', function () {
    var options = getCjsOptions();
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
            'build-commonjs',
            'build-es6'
        ],
        callback
    );
});