const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const webpack = require('webpack');

// This function gets the entry points for all blocks (both JS and SCSS)
const getBlockEntries = () => {
  const jsFiles = glob.sync(path.resolve(__dirname, 'blocks/**/index.{js,ts,tsx}'));
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

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development';

  return {
    entry: getBlockEntries(),  // Now it will work because getBlockEntries is defined

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: (pathData) => {
        if (pathData.chunk.name.endsWith('-editor') || pathData.chunk.name.endsWith('-style')) {
          return pathData.chunk.name + '.js';
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
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
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

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: isDevMode
        ? {
            'react': 'react/cjs/react.development.js',
            'react-dom': 'react-dom/cjs/react-dom.development.js',
          }
        : {
            'react': 'react/cjs/react.production.min.js',
            'react-dom': 'react-dom/cjs/react-dom.production.min.js',
          },
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: (pathData) => {
          if (pathData.chunk.name.endsWith('-editor')) {
            return pathData.chunk.name.replace('-editor', '/editor.css');
          }
          if (pathData.chunk.name.endsWith('-style')) {
            return pathData.chunk.name.replace('-style', '/style.css');
          }
          return '[name].css';
        },
      }),
      new DependencyExtractionWebpackPlugin({ injectPolyfill: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDevMode ? 'development' : 'production'),
      }),
    ],

    mode: isDevMode ? 'development' : 'production',

    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },

    devtool: 'source-map',
  };
};
