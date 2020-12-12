const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const theme = require('./package.json').theme
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'bundle.[hash].js',
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                         options: 
                            {javascriptEnabled: true,modifyVars: 
                                theme
                            }
                    },
                ],
                include: /node_modules/,
            },

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify: {
		        removeComments: true,
		        collapseWhitespace: true,
		        removeAttributeQuotes: true
		    },
        }),
        new CleanWebpackPlugin()
    ]
}