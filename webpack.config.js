let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');


let config = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
                    'file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;