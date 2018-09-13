const { AngularCompilerPlugin } = require('@ngtools/webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var appModule = __dirname + '/src/app/app.module#AppModule';


module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './src/main.aot.ts',
  //entry: './js/ng2/app/main.aot.ts',
  output: {
    path: path.resolve(__dirname, '.build/aot'),
    filename: 'app.main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'TYPE': JSON.stringify('AOT')
        }
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig-aot.json',
      entryModule: appModule
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new CopyWebpackPlugin([
        {
            from: './src/index.html', to: 'index.html'
        },
        {
            from: './node_modules/zone.js/dist/zone.js',
            to: './node_modules/zone.js/dist/zone.js'
        }
    ])
  ],
  module: {
    rules: [
      {test: /\.scss$/, use: ['raw-loader', 'sass-loader']},
      {test: /\.css$/, use: 'raw-loader'},
      {test: /\.html$/, use: 'raw-loader'},
      {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};

