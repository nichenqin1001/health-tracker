var path = require('path');
var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['jquery', 'backbone', 'underscore'],
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|woff|svg|woff2|ttf)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Backbone: 'backbone',
            _: 'underscore'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
