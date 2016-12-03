var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'karma.entry.js'
        ],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap'],
            'src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'lcov', subdir: 'coverage' }
            ]
        },
        colors: true,
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        webpack: {
            devtool: 'inline-source-map',
            ts: {
                compilerOptions: {
                    noEmitHelpers: true
                }
            },
            module: {
                loaders: [
                    {
                        test: /.*(?!\.d\.ts)|(\.ts)$/,
                        loader: 'ts-loader',
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        exclude: [path.resolve(__dirname, 'node_modules')]
                    }
                ],
                postLoaders: [{
                    test: /\.ts$/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    exclude: [path.resolve(__dirname, 'node_modules/@angular'), path.resolve(__dirname, 'node_modules/rxjs')],
                    loader: 'istanbul-instrumenter'
                }]
            },
            resolve: {
                modulesDirectories: [
                    'node_modules'
                ],
                extensions: ['', '.ts', '.tsx', '.json', '.js']
            }
        },
        webpackServer: {
            noLog: true,
            noInfo: true
        }
    });
    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
};