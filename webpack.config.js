const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 9000
    }
};

module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    entry: {
        filename: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/inline'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: './index.html',
            template: 'src/index.html'
        }),
    ],
    ...devServer(develop)
});
