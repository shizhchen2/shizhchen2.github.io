// const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    entry:{
        index:'./src/index.js',
        home:'./src/home.js',
},
    // plugins:[
    //     new HtmlWebpackPlugin()
    // ]
    mode:"development",
    output:{
        filename:'[name]_[hash:6]_bundle.js',
        path:path.join(__dirname,'release')
    }
}