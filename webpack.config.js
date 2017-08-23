require('babel-polyfill');

const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator')

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cfg = require('./config/base');
const src = cfg.paths.src;

const dev = './config/webpack/webpack.dev';
const prod = './config/webpack/webpack.prod';


const config = merge({
    context: src,
    output: {
        path: cfg.paths.output,
        filename: 'js/[name].js',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: [src]
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                include: src,
                exclude: /node_modules/,
                loaders: ['ng-annotate', 'babel?extends=' + cfg.babel.configFile]
            },
            {
                test: /\.css$/,
                //include: src,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.scss$/,
                include: src,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.json$/,
                loader: 'angular-translate?module=translations'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?limit=10000&mimetype=application/font-woff&name=' + cfg.paths.fonts + '/[name].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader?name=' + cfg.paths.img + '/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=' + cfg.paths.fonts + '/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html',
                exclude: /app\.html$/
            }
        ]
    },
    postcss: function () {
       return [autoprefixer];
    },
    resolve: {
        modulesDirectories: [src, 'node_modules'],
        extensions: ['', '.json', '.js']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new CopyWebpackPlugin([
            { from: './translate',
            to:'./translate'},
            { from: './assets/img',
            to:'./assets/img'}
        ])
    ],
    eslint: {
        configFile: cfg.eslint.configFile
    }
}, cfg.isDevelop ? require(dev) : require(prod));

module.exports = validate(config);
