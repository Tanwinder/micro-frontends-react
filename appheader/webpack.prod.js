const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, '../dist/appheader'),
        filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
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
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/react-app.html'),
            inject: false
        })
    ]
});