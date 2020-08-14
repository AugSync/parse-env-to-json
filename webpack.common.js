const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })],
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist/build'),
    libraryTarget: 'commonjs2',
  },
};
