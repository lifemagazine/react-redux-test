var webpack = require('webpack');
 
module.exports = {
 
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:3001',
        'webpack/hot/only-dev-server'
    ],
 
    output: {
        path: '/',
        filename: 'app.js'
    },
 
    devServer: {
        hot: true,
        filename: 'app.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "*": "http://localhost:3000"
        }
    },
 
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
 
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            }
        ]
    }
};
