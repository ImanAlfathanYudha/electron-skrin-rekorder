const rules = require('./webpack.rules');

// CSS rule
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

// Image rule
rules.push({
  test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
  type: 'asset/resource',
});

module.exports = {
  module: {
    rules,
  },
};