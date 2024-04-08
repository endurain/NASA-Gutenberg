const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const getBlockEntries = () => {
  const jsFiles = glob.sync(path.resolve(__dirname, 'blocks/**/index.js'));
  const scssEditorFiles = glob.sync(path.resolve(__dirname, 'blocks/**/editor-style.scss'));
  const scssStyleFiles = glob.sync(path.resolve(__dirname, 'blocks/**/style.scss'));
  
  const entries = {};

  jsFiles.forEach((file) => {
    const blockName = path.basename(path.dirname(file));
    entries[blockName] = file;
  });

  scssEditorFiles.forEach((file) => {
    const blockName = path.basename(path.dirname(file)) + '-editor';
    entries[blockName] = file;
  });

  scssStyleFiles.forEach((file) => {
    const blockName = path.basename(path.dirname(file)) + '-style';
    entries[blockName] = file;
  });

  return entries;
};

module.exports = {
  entry: getBlockEntries(),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (pathData) => {
      // JavaScript files are named 'index.js'
      if (pathData.chunk.name.endsWith('-editor') || pathData.chunk.name.endsWith('-style')) {
        return pathData.chunk.name + '.js'; // This should not be the case but added to handle any exceptions
      }
      return '[name]/index.js';
    },
  },

  externals: {
    '@wordpress/blocks': 'wp.blocks',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/editor': 'wp.editor',
    '@wordpress/components': 'wp.components',
    '@wordpress/element': 'wp.element',
    '@wordpress/block-editor': 'wp.blockEditor',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Define the filename pattern for CSS
      filename: (pathData) => {
        // Editor styles are named 'editor.css'
        if (pathData.chunk.name.endsWith('-editor')) {
          return pathData.chunk.name.replace('-editor', '/editor.css');
        }
        // Frontend styles are named 'style.css'
        if (pathData.chunk.name.endsWith('-style')) {
          return pathData.chunk.name.replace('-style', '/style.css');
        }
      },
    }),
    new DependencyExtractionWebpackPlugin({ injectPolyfill: true }),
  ],

  mode: 'production',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },

  devtool: 'source-map',
};
