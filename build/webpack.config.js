const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)
const inProjectDist = (file) => inProject(project.outDir, file)

// web static js模块文件
const STYLES_PATH_TO_EXTRACT = [inProjectSrc('styles'), 'node_modules'];

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'


const config = {
  entry: {
    normalize: [
      inProjectSrc('normalize'),
    ],
    main: [
      inProjectSrc(project.main),
    ]
  },
  devtool: project.sourcemaps ? (__PROD__ ? 'source-map' : 'eval-source-map') : false,
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash:8].js',
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  externals: project.externals,
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(project.env) },
      __DEV__,
      __TEST__,
      __PROD__,
    }, project.globals))
  ],
}

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime',
          {
            helpers: true,
            polyfill: false, // we polyfill needed features in src/normalize.js
            regenerator: true,
          },
        ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          },
        ]
      ],
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          targets: {
            ie9: true,
            uglify: true,
            modules: false,
          },
        }],
      ]
    },
  }],
})

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash:8].css',
  allChunks: true,
  disable: __DEV__,
})

config.module.rules.push({
  test: /\.css$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: project.sourcemaps,
        includePaths: STYLES_PATH_TO_EXTRACT,
      }
    }]
  })

});

config.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll : true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: project.sourcemaps,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: project.sourcemaps,
          includePaths: STYLES_PATH_TO_EXTRACT,
        },
      }
    ],
  })
})

config.plugins.push(extractStyles)

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 1000,
  },
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

// Bundle Splitting
// ------------------------------------
if (!__TEST__) {

  var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

  config.plugins.push(new CommonsChunkPlugin({
    name: 'common',
    chunks: ['main'],
    minChunks: function(module, count) {
      return !isExternal(module) && count >= 2; // adjustable
    }
  }));

  config.plugins.push(new CommonsChunkPlugin({
    name: 'vendors',
    // main, common
    chunks: _.without.apply(_,  [Object.keys(config.entry), 'normalize']).concat('common'),
    minChunks: function(module) {
      return isExternal(module);
    }
  }));
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    })
  )
}

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: !__DEV__,
  },
  chunksSortMode: function (chunk1, chunk2) {
    var orders = ['manifest', 'normalize', 'vendors', 'common', 'main'];
    var order1 = orders.indexOf(chunk1.names[0]);
    var order2 = orders.indexOf(chunk2.names[0]);
    if (order1 > order2) {
      return 1;
    } else if (order1 < order2) {
      return -1;
    } else {
      return 0;
    }
  }
}))


function isExternal(module) {
  var context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return context.indexOf('node_modules') !== -1;
}


module.exports = config
