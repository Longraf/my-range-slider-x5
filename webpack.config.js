const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './js/main.js',
    },
    output: {
        filename: isDev ? "[name].js" : "[name][contenthash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Timofeev webpack",
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/img'), to: "img" },
            ],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name][contenthash].css"
        })
    ],
    resolve: {
        extensions: ['.js', '.json'] // Расширения пониманемые по умолчанию
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        port: 4200,
        hot: isDev,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};