var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const rimraf = require('rimraf');

const webpack = require("webpack");
const DEV_MODE = "development";
const NODE_ENV = process.env.NODE_ENV || DEV_MODE;

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [['@babel/preset-env', { modules: false}]],
        plugins: [
            '@babel/plugin-transform-runtime',
            "@babel/plugin-syntax-dynamic-import"
        ]
    }
};

module.exports = {
    context: __dirname + "/frontend",
    entry: {
        app: "./app",
        another: "./another",
        // home: "./home",
        // about: "./about",
        common: ["./my_commons"],
        contact: "./contact",
    },
    output: {
        path: __dirname + "/public/js",
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: "/js/",
        // library: "[name]"
    },
    watch: NODE_ENV == DEV_MODE,
    mode: NODE_ENV,
    plugins: [
        {
            apply: (compiler) => {
                rimraf.sync(compiler.options.output.path);
            }
        },
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            USER: JSON.stringify(process.env.USER)
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new AssetsPlugin({
            useCompilerPath: true,
            prettyPrint: true,
            includeAllFileTypes: false,
            fullPath: false
        }),
        // new ForkTsCheckerWebpackPlugin({
        //     tsconfig: __dirname + '/tsconfig.json'
        // }),
        // new BundleAnalyzerPlugin()
    ],
    devtool: NODE_ENV ? 'cheap-inline-module-source-map' : false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.less'],
        modules: [
            __dirname + '/vendor',
            'node_modules'
        ],
        alias: {
            old: "old/dist/old"
        }
    },
    // externals: {
    //     'jQuery': 'jquery',
    // },
    module: {
        noParse: /jquery|lodash/,
        rules: [/*{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                babelLoader,
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            ]
        }, */{
            test: /\.js$/,
            // exclude: /\/node_modules\//,
            include: [
                /frontend/,
            ],
            use: babelLoader
        },{
            test: /\.jade$/,
            use: {
                loader: 'jade-loader'
            }
        },/* not work with noParse */ /*{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }]
        },*/{
            test: /old\.js$/,
            use: [{
                loader: 'expose-loader',
                options: 'Work'
            },
                'imports-loader?workSettings=>{delay:500}',
                'exports-loader?Work',

            ]
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                    loader: 'less-loader', // compiles Less to CSS
                },
            ],
        }, {
            test: /\.svg$/,
            include: /\/node_modules\//,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        regExp: /\/node_modules\/(.*)/,
                        name: '[1][name].[hash:6].[ext]',
                    },
                },
            ],
        }, {
            test: /\.svg$/,
            exclude: /\/node_modules\//,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash:6].[ext]',
                    },
                },
            ],
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            name: 'common',
            cacheGroups: {
                nodeModules: {
                    test: path.resolve('node_modules'),
                    name: 'vendor',
                    chunks: 'all',
                },
                vendor: {
                    test: path.resolve('vendor'),
                    name: 'vendor',
                    chunks: 'all'
                },
                // styles: {
                //     name: 'common',
                //     test: /\.less$/,
                //     chunks: 'all',
                //     enforce: true,
                // },
            }
        }
    }
}

function wrapRegExp(regexp, label) {
    function newTest(path) {
        console.log(label, path);
        return RegExp.prototype.test.call(this, path);
    }

    regexp.test = newTest;
    return regexp;
}
