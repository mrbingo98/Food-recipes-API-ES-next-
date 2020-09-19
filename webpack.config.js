const path = require('path'),
    HWP = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', './src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HWP({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_module/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
    }
}