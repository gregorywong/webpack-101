const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProd = process.env.NODE_ENV === 'production';
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
});
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack 101",
            minify: {
                collapseWhitespace: isProd
            },
            template: './src/index.ejs'
        }),
        new ExtractTextPlugin('app.css')
    ]

}