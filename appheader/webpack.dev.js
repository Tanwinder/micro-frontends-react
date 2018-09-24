const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: '[name].js',
    },
    devServer: {
        port: 4100,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: [ 'css-loader', 'sass-loader' ]
					})
			}
        ]
    },
    plugins: [
        new ExtractTextPlugin({ 
            filename: 'header.css' 
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'react-app.html',
            template: path.resolve(__dirname, 'src/react-app.html'),
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/application.html'),
            inject: false
        })
    ]
});
