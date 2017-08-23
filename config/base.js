const path = require('path');

const packageJSON = require('../package.json');

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const root = path.resolve(__dirname, '../');
const src = path.resolve(root, './src/app');
const output = path.resolve(root, './build');
const babelPath = path.resolve(root, './config/babel/.babelrc');

const options = {
    paths: {
        root: root,
        src: src,
        favIconPath: 'assets/img/favicon.ico',
        output: output,
        entry: 'app.js',
        htmlPath: 'app.html',
        img: './assets/img',
        fonts: './fonts'
    },
    port: port,
    package: packageJSON,
    eslint: {
        configFile: 'config/eslint/.eslintrc'
    },
    babel: {
        configFile: path.resolve(root, './config/babel/.babelrc')
    },
    isDevelop: NODE_ENV === 'development',
    isProd: NODE_ENV === 'production',
};

module.exports = options;
