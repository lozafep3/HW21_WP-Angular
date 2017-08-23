const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const cfg = require('../base');
const src = cfg.paths.src;

const config = {
    entry: cfg.paths.entry,
    output: {
        publicPath: 'http://93.190.44.150:8080/'
        // publicPath: cfg.paths.output + '/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: cfg.package.name,
            template: cfg.paths.htmlPath,
            inject: 'body',
            hash: true,
            favicon: cfg.paths.favIconPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new CleanPlugin([cfg.paths.output], { root: cfg.paths.root }),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        })
    ]
};

module.exports = config;
