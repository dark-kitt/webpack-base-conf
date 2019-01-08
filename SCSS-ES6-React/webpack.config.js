/* define max size for entry
    module.exports = {
      entry: {
        main: './path/to/my/entry/file.js'
      }
    };
*/
const maxEntrypointSize = 250000; /* default: 250000 (bytes) */
const maxAssetSize = 250000; /* default: 250000 (bytes) */


/* define variables for the ProvidePlugin */
const providePlugin = {
    $: 'jquery',
    jQuery: 'jquery',
    React: 'react',
    ReactDOM: 'react-dom'
};

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => ({
    mode: argv.mode,
    entry: {
        main: [
            path.resolve(__dirname, 'jsx/main.jsx'),
            path.resolve(__dirname, 'scss/main.scss')
        ]
    },
    devtool: 'source-map',
    watch: argv.mode === 'production' ? false : true,
    watchOptions: {
        poll: 500,
        ignored: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'cache'),
            path.resolve(__dirname, 'js'),
            path.resolve(__dirname, 'css')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: argv.mode === 'production' ? '[name].bundle.min.js' : '[name].bundle.js'
    },
    performance: {
        hints: argv.mode === 'production' ? 'error' : false,
        maxEntrypointSize: maxEntrypointSize,
        maxAssetSize: maxAssetSize
    },
    optimization: {
        minimize: argv.mode === 'production' ? true : false,
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                react: {
                    test: /\/node_modules\/(react|react-dom)\//
                },
                jquery: {
                    test: /\/node_modules\/(jquery)\//
                }
            },
        },
        minimizer: argv.mode === 'production'
            ? [
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.(sa|sc|c)ss$/,
                    cssProcessorOptions: {
                        autoprefixer: {
                            add: true,
                            browsers: [
                                'last 4 versions'
                            ]
                        },
                        discardComments: {
                            removeAll: true
                        },
                        map: {
                            inline: false
                        }
                    },
                    canPrint: true
                }),
                new UglifyJsPlugin({
                    test: /\.j(s|sx)$/,
                    exclude: /\/node_modules/,
                    cache: './cache',
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        warnings: argv.mode === 'production' ? true : false,
                        parse: {},
                        compress: {},
                        mangle: true, /* Note `mangle.properties` is `false` by default. */
                        output: null,
                        toplevel: false,
                        nameCache: null,
                        ie8: false,
                        keep_fnames: false
                    }
                })
            ]
            : []
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)$/,
                exclude: /\/node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-react-jsx']
                        }
                    }
                ]
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({}),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, './scss')],
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin(providePlugin),
        new MiniCssExtractPlugin({
            filename: argv.mode === 'production' ? './../css/[name].bundle.min.css' : './../css/[name].bundle.css'
        }),
        new CleanWebpackPlugin([
            'js',
            'css'
        ])
    ]
});
