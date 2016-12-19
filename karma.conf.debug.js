var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        colors: true,
        files: [
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        singleRun: false,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        loader: 'ts',
                        test: /\.ts$/
                    }
                ]
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
};
