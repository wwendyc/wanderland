const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './app/initialize.js'],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-maps',
  resolve: {
    "alias": {
      "react": "preact",
      "react-dom": "preact-compat"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
