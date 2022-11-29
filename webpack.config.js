const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.argv[process.argv.indexOf('--mode') + 1];
const devMode = mode === 'development';

var config = {
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "index.[contenthash].js",
        assetModuleFilename: "assets/[hash][ext]"
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
    }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("postcss-preset-env")]
                            }
                        }
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.woff2?$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],
                type: "asset/resource"
            },
        ],
    },
};

module.exports = (env, argv) => {

    if (mode === 'development') {
        config.target = 'web';
        config.devtool = 'source-map';
    }

    if (mode === 'production') {
        config.target = "browserslist";
        config.devtool = undefined;
    }

    return config;
}

