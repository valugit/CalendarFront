const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')


module.exports = merge(common, {
  mode: "production",
  devtool: 'source-map',
  performance: {
    //hints: false
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin(),
      new CompressionPlugin({ test: /\.js(\?.*)?$/i, algorithm: 'gzip' }),
      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: {
          cache: false,
          showErrors: false,
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
    }
  },
})