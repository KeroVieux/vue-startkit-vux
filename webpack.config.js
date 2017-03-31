const path = require('path')
const webpack = require('webpack')
const _ = require('lodash')
const vuxLoader = require('vux-loader')
const argConfig = require('./arguments.config.js')

const webpackConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box,
            // no loader config like this nessessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          // other vue-loader options go here
          plugins: [{
            name: 'vux-ui'
          }]
        },
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000',
      },
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
    extensions: ['.js', '.vue', '.json'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
}

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [
    {
      name: 'vux-ui',
    },
    {
      name: 'less-theme',
      path: 'src/assets/less/theme.less'
    }

  ],
})

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
  console.log('you are staying in the developing mode , it will not compress any code .')
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ])
}
