var gulp = require('gulp');
var runSequence = require('run-sequence');
var conventionalGithubReleaser = require('conventional-github-releaser');
var git = require('gulp-git');
var fs = require('fs');

gulp.task('git-commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number', {args: '--no-verify'}));
});

gulp.task('git-push-changes', function (cb) {
    git.push('origin', 'master', cb);
});

gulp.task('git-create-new-tag', function (cb) {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', { args: '--tags' }, cb);
    });

    function getPackageJsonVersion() {
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
});

gulp.task('conventional-release', function (done) {
    conventionalGithubReleaser({ type: 'oauth', token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN }, { preset: 'angular' }, done);
});

gulp.task('release', function (callback) {
    runSequence(
        'git-commit-changes',
        'git-push-changes',
        'git-create-new-tag',
        'conventional-release',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});