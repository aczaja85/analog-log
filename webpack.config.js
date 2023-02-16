const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    proxy: {
      // UPDATE THIS IF URL IS NOT /API. UPDATE IT TO WHATEVER THE ROUTE IS.
      '/api/**': {
        // ANY REQUEST WILL BE SENT TO OUR NODE SERVER RUNNING ON PORT 3000 AND WILL BE PROCESSED FROM THERE.
        // UPDATE PORT NUMBER IF NECESSARY
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  //   historyApiFallback: true,
  //   port: 8080,
  //   hot: true,
  //   compress: true,
  //   proxy: {
  //     '/**': 'http://localhost:3000',
  //   },
  //   watchFiles: ['src/**'],
  // },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

// devServer: {
//   static: {
//     directory: path.join(__dirname, 'build')
//   },
//   historyApiFallback: true,
//   port: 8080,
//   hot: true,
//   compress: true,
//   proxy: {
//     '/**': 'http://localhost:3000'
//   },
//   watchFiles: ['client/**']
// }
