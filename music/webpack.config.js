const path=require('path');
module.exports={
              entry:'./src/index.js',
              output:{
                      path:path.join(__dirname,'public'),
                      filename:'bundle.js'
                     },
             module: {
                      rules: [{
                               test: /\.js$/,
                               use: 'babel-loader',
                               exclude:/node_modules/
                              }]
                     },
            devtool:'cheap-module-eval-source-map',
            devServer: {
                        contentBase: path.join(__dirname, 'public'),
                        compress: true, 
                        port: 3000
                        },
            mode:'development'
           }