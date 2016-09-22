var gulp = require('gulp');
var git = require('gulp-git');
var fs = require('fs');

gulp.task('git-commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
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