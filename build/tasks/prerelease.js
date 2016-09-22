var gulp = require('gulp');
var runSequence = require('run-sequence');
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalRecommendedBump = require('conventional-recommended-bump');
var bump = require('gulp-bump');
var gutil = require('gulp-util');

var releaseType = '';

gulp.task('conventional-get-bump', function (callback) {
    conventionalRecommendedBump({ preset: 'angular' }, function (err, result) {
        releaseType = result.releaseType;
        callback();
    });
});

gulp.task('bump-version', function () {
    return gulp.src(['./package.json'])
        .pipe(bump({ type: releaseType }).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

gulp.task('write-changelog', function () {
    return gulp.src('CHANGELOG.md', { buffer: false })
        .pipe(conventionalChangelog({ preset: 'angular' }))
        .pipe(gulp.dest('./'));
});

gulp.task('prerelease', function (callback) {
    runSequence(
        'prepublish',
        'conventional-get-bump',
        'bump-version',
        'write-changelog',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('Release preparation completed successfully');
            }
            callback(error);
        });
});