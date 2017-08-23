const HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    plugins: [new HtmlWebpackPlugin(
        {
            title: "Webpack 101",
            minify: {
                collapseWhitespace: isProd
            },
            template: './src/index.ejs'
        }
    )]

}