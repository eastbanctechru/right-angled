var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        colors: true,
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'lcov', subdir: 'coverage' }
            ]
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap'],
            'src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage'],
        singleRun: true,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        exclude: [path.resolve(__dirname, 'node_modules')],
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        loader: 'ts-loader',
                        test: /.*(?!\.d\.ts)|(\.ts)$/,
                    }
                ],
                postLoaders: [{
                    exclude: [
                        path.resolve(__dirname, 'node_modules/@angular'),
                        path.resolve(__dirname, 'node_modules/rxjs')
                    ],
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    loader: 'istanbul-instrumenter',
                    test: /\.ts$/
                }]
            },
            resolve: {
                extensions: ['', '.ts', '.tsx', '.json', '.js'],
                modulesDirectories: [
                    'node_modules'
                ]
            },
            ts: {
                compilerOptions: {
                    noEmitHelpers: true
                }
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
};
