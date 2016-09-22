var gulp = require('gulp');
var Server = require('karma').Server;
var isVerbose = true;

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/../../karma.conf.debug.js',
        client: { captureConsole: isVerbose },
        browsers: ['Chrome'],
        singleRun: false
    }, done).start();
});