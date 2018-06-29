const path = require('path');
const Package = require('pjson');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  /* Enable sourcemaps for debugging webpack"s output. */
  devtool: 'inline-source-map',

  /* Mocks the FS module in the browser */
  node: {
    fs: "empty"
  },

  /**
   * main.tsx represents the entry point to your web application. Webpack will
   * recursively go through every "require" statement in main.tsx and
   * efficiently build out the application"s dependency tree.
   */
  entry: [
    'react-hot-loader/patch',
    './main.tsx'
  ],

  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ]
  },

  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    path: __dirname + '/dist',
    publicPath: '/ui/',
    filename: 'bundle.js'
  },

  /* Development server configurations */
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    port: process.env.PORT || 8099,
    historyApiFallback: true,
    inline: true,
    hot: true
  },

  plugins: [

    /* Exclude unused moment.js locales  */
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|pt|es/),

    /* Window provide plugin */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'Holder': 'holderjs',
      'holder': 'holderjs',
      'window.Holder': 'holderjs',
      'window.jQuery': 'jquery'
    }),

    /* Defines all env variables needed by MainConfig */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        PACKAGE_VERSION: JSON.stringify(Package.version),
      },
    }),

    /* Generates the root index based on template */
    new HtmlWebpackPlugin({
      title: Package.name,
      version: Package.version,
      template: path.resolve(__dirname, "./src/index.html")
    }),

    /* Hot module replacement plugin */
    new webpack.HotModuleReplacementPlugin(),

    // Activate to debug bundle size
    // new BundleAnalyzerPlugin()
  ],

  module: {
    rules: [
      /* Typescript Loader */
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      },

      /* Stylesheet loaders */
      {
        test: /\.(scss|css)$/,
        use: [
          // creates style nodes from JS strings
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          },
          // translates CSS into CommonJS
          { loader: "css-loader" },
          // compiles Sass to CSS 
          { loader: "sass-loader" }
        ],
      },

      /* Image loader */
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: ['file-loader'],
      },

      /* Font loader */
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        use: ['file-loader'],
      },

      /* JSON loader */
      {
        test: /\.json$/,
        exclude: [/node_modules/],
        use: ['json-loader'],
      },
    ]
  },
};
