const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// Set different CSS extraction for editor only and common block styles
// const blocksCSSPlugin = new ExtractTextPlugin( {
//   filename: './assets/css/main.css',
// } );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ],
      },
    },
  ],
};


module.exports = {
  entry: {
    './assets/js/main' : './src/index.js',
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /([a-zA-Z0-9\s_\\.\-\(\):])+(.s?css)$/,
      //   use: blocksCSSPlugin.extract( extractConfig ),
      // },
    ],
  },
  // plugins: [
  //   blocksCSSPlugin,
  // ],
};
