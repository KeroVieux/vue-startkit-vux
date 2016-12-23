var path = require('path')
var webpack = require('webpack')
var _ = require('lodash')
var argConfig = require('./arguments.config.js')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}


console.log('If you have anything confused , plz get in touch with me , bigboss@hidoge.cn')
if (process.env.arg) {
  if (argConfig[process.env.arg]) {
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        globalArg:JSON.stringify(argConfig[process.env.arg])
      })
    ])
  }else {
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        globalArg:JSON.stringify(argConfig[_.keys(argConfig)[0]])
      })
    ])
  }
}else {
  console.warn('I think you may set the global argument via the package.json and the arguments.config .')
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      globalArg:JSON.stringify(argConfig[_.keys(argConfig)[0]])
    })
  ])
}
if (process.env.mode === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else {
  console.warn('you are stay in the developing mode , it will not compress any code .')
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ])
}
