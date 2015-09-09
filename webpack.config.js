const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

const config = {
  entry: {
    application: getEntrySources([
      path.resolve(__dirname, 'assets/assets.js')
    ])
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: "[id].js",
    publicPath: "/public/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!')
      }, {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!' + "sass?indentedSyntax")
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  // devtool: "sourcemap",
  plugins: [
    new ExtractTextPlugin("[name].css", {allChunks: true, disable: false})
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  }
};

module.exports = config;
