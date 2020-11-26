var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/App.js',
        //anthills: './src/anthills.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        publicPath: '/static/',
        compress: true,
        hot: true
    }
}