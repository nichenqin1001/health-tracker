var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: { app: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        { test: /\.html$/, loader: 'underscore-template-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.(eot|woff|svg|woff2|ttf)$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new CleanWebpackPlugin(['dist'])
    ]
};
