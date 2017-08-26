const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

var isProd = process.env.NODE_ENV === 'production';
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
});
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

var usingHMR = false;

module.exports = {
    entry: {
        app: './src/app.jsx',
        contact: './src/contact.jsx',
        "pug-test": './src/pug-test.jsx',
        bootstrap: bootstrapConfig
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
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
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            },
            { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader' }
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
                // collapseWhitespace: isProd
                collapseWhitespace: false
            },
            // excludeChunks: ['contact'],
            chunks: ['bootstrap', 'app'],
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
        new HtmlWebpackPlugin({
            title: "Webpack and Twitter 2 Bootstrap",
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['bootstrap'],
            filename: 'bootstrap-test.html',
            template: './src/bootstrap-test.ejs'
        }),
        new ExtractTextPlugin({
            filename: './css/[name].css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            "window.Tether": "tether"
        }),
        new webpack.HotModuleReplacementPlugin({
            disable: !usingHMR
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Popper: ['popper.js', 'default'],
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        })
    ]
}