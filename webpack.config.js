const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    devServer: {
        open: true,
        port: 3000
    },
    entry: './example/src/App.jsx',
    module: {
        rules: [
            {
                exclude: /node_modules/u,
                test: /\.(t|j)sx?$/u,
                use: 'ts-loader'
            },
            {
                test: /\.css$/u,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|eot|svg|ttf|woff|woff2)$/u,
                use: 'url-loader'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('example/dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './example/src/favicon.ico',
            filename: './index.html',
            inject: true,
            template: './example/src/index.html'
        })
    ],
    resolve: {extensions: ['.ts', '.tsx', '.js', '.jsx']}
};