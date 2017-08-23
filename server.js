const open = require('open');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config');
const cfg = require('./config/base');

var server = new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    inline: true,
    hot: true,
    contentBase: cfg.paths.output,
    stats: { colors: true }
});

server.listen(cfg.port, 'localhost', function (err) {
    if (err) { console.log(err); }
    open('http://localhost:' + cfg.port + '/');
    console.log('Listening at localhost:' + cfg.port);
});
