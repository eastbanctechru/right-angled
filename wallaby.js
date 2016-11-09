var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
    return {
        files: [
            'karma.entry.js'
        ],

        tests: [
            { pattern: 'tests/**/*.ts', load: false }
        ],

        postprocessor: webpackPostprocessor,
        env: {
            type: 'browser',
            runner: require('phantomjs-prebuilt').path,
            params: {
                runner: '--web-security=false'
            }
        },

        testFramework: 'mocha@3.0.2',

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        },
        debug: true
    };
};