const cfg = require('./config/base.js');
const src = cfg.paths.src;

module.exports = function (config) {
    config.set({
        browsers: [ 'PhantomJS' ], //Chrome
        //singleRun: true,
        browserNoActivityTimeout: 60000,
        frameworks: ['jasmine'],
        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            {
                pattern: 'config/webpack/webpack.test.js',
                watched: false
            },
            //'./src/app/**/*.js'
        ],
        exclude: [
            './src/spp/assets/uui/**/*.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-webpack',
            'karma-spec-reporter',
        ],
        preprocessors: {
              //'./src/app/**/*.js': [ 'webpack', 'sourcemap', 'coverage'],
            'config/webpack/webpack.test.js': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            type : 'html',
            dir : 'reports/coverage/'
        },
        webpack: {
            module: {
                preLoaders: [
                    { test: /\.js$/,
                      include: src,
                      exclude: /node_modules/,
                      loaders: ['isparta']
                    },
                    {
                        test: /\.js$/,
                        include: src,
                        exclude: /node_modules/,
                        loaders: ['ng-annotate', 'babel?extends=' + cfg.babel.configFile]
                    }
                ],
                /*loaders: [
                    {
                        test: /\.js?$/,
                        exclude: /node_modules/,
                          loaders: ['ng-annotate', 'babel?extends=' + cfg.babel.configFile]
                    }
                ],*/
                postLoaders: [{
                    test: /\.js?$/,
                    exclude: /(node_modules|\.spec\.js$)/,
                    loader: 'istanbul-instrumenter',
                    query: {
                        esModules: true
                    }
                }]
            },
            watch: true
        },
        webpackServer: {
            //noInfo: true
        }
    });
}
