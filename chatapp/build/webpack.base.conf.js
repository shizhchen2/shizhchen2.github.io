
const path = require('path')
module.exports = {
    entry:{
        app:'./src/index.js'
    },
    output:{
        filename:'js/[name].[hash].js',
        path:path.join(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"babel-loader",
                include:path.join(__dirname,'../src')
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:[
                    {  loader: "style-loader"  },
                    {  loader: "css-loader" },
                    {
                       loader: "postcss-loader",//自动加前缀
                       options: {
                              plugins:[
                                     require('autoprefixer')()
                             ]
                       }
                    },
                    {  loader: "less-loader" ,options: { javascriptEnabled: true }}
                ],include:[/antd-mobile/]
            },
            {
                test: /\.less$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      sourceMap: true,
                      localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                      plugins: [
                        require('autoprefixer')()
                      ]
                    }
                  },
                  { loader: 'less-loader', options: { javascriptEnabled: true } },
                ],
                exclude: [/antd-mobile/],
              },
            {
                test: /\.scss$/,
                    use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                    },
                    { loader: "sass-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                        plugins: [
                            require('autoprefixer')()
                        ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    // outputPath:'../',//输出**文件夹
                    publicPath: '/',
                    name: "images/[name].[ext]",
                    limit: 1000  
                  }
                }]
            },
            {
                test: /\.(woff|svg|eot|woff2|tff)$/,
                use: 'url-loader',
                exclude: /node_modules/
            }
        ]
    }
    
}