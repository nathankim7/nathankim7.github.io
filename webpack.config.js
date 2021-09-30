var path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
    mode: 'development',
    entry: {
        index: './src/App.js',
        blogpost: './src/BlogPost.js'
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
        }, {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
    
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource'
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        }, {
            test: /\.(pdf)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }]
        }, ], 
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, ''),
        },
        compress: true,
        hot: true
    }
}