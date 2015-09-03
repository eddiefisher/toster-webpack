var webpack = require("webpack");
var path = require('path');
var bourbon = require('node-bourbon').includePaths;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    // sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

var config = {
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
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!' + "sass?includePaths[]=" + bourbon)
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!' + "sass?indentedSyntax")
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
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
