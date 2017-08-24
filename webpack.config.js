const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

var isProd = process.env.NODE_ENV === 'production';
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
});
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssConfig = isProd ? cssProd : cssDev;

var usingHMR = false;

module.exports = {
    entry: {
        app: './src/app.jsx',
        contact: './src/contact.jsx',
        "pug-test": './src/pug-test.jsx'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        hot: usingHMR,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack 101",
            minify: {
                collapseWhitespace: isProd
            },
            // excludeChunks: ['contact'],
            chunks: ['app'],
            template: './src/index.ejs'
        }),
        new HtmlWebpackPlugin({
            title: "Contact Page",
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.ejs'
        }),
        new HtmlWebpackPlugin({
            title: "Pug Test Page",
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['pug-test'],
            filename: 'pug-test.html',
            template: './src/pug-test.pug'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin({
            disable: !usingHMR
        })
    ]
}