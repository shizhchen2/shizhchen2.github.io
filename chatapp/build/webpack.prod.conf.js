const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = merge(baseConfig,{
    mode:'production',
    plugins:[
        new HtmlWebpackPlugin({
            template:'public/index.html',
            title:'talk to boss',
            minify:{
                removeComments: true,
		        collapseWhitespace: true,
		        removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ]
})