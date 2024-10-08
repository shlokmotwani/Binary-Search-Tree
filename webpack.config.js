const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: './src/index.html',
            inject: 'body',
            title: 'Binary Search Tree',
        }
    )],
    mode: 'none',
    devtool: 'inline-source-map',
}