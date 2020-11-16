const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html'
  }),
  new Dotenv({
    safe: true
  })
];

if (isProduction) {
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = [
  {
    entry: ['./src/main.jsx'],
    mode,
    devtool,
    output: {
      path: path.resolve(__dirname, 'bundle'),
      filename: 'client.js',
      publicPath: './',
    },
    node: {
      fs: 'empty',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      host,
      port,
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json', '.css']
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'public')
          ],
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'public'),
          ],
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        }
      ],
    }
  }
];