const webpack = require('webpack');
const open = require('open');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');

const cfg = require('../base');

const src = cfg.paths.src;
const host = 'http://localhost:' + cfg.port + '/';

open(host);

const config = {
    devtool: 'inline-source-map',
    watch: true,
    entry: [
        //'webpack-dev-server/client?' + host,
        'webpack/hot/only-dev-server',
        cfg.paths.entry
    ],
    output: {
        publicPath: host
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: cfg.package.name,
            template: cfg.paths.htmlPath,
            inject: 'body',
            hash: true,
            favicon: cfg.paths.favIconPath
        }),
        new ExtractTextPlugin('css/[name].css', {disable: true}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: cfg.port,
        historyApiFallback: true,
        inline: true,
        hot: true,
        contentBase: cfg.paths.output
        // contentBase: host
    }
};

module.exports = config;
