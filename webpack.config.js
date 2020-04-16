const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'example/src/index.html'),
    favicon: path.join(__dirname, 'example/src/favicon.ico'),
    filename: './index.html',
    inject: true
});

module.exports = {
    entry: path.join(__dirname, 'example/src/App.jsx'),
    output: {
        path: path.join(__dirname, 'example/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                est: /\.js$/,
                exclude: /node_modules/,
                loader: 'source-map-loader'
            },
            {
                test: /\.(t|j)sx?$/,
                use: {loader: 'ts-loader'},
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|eot|svg|ttf|woff|woff2)$/,
                use: [{loader: 'url-loader'}]
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'eval-source-map',
    devServer: {
        open: true,
        port: 3000
    }
};