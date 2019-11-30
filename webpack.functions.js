const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  target: "node",
  plugins: [
    new webpack.DefinePlugin({
      "global.GENTLY": false
    }),
    new Dotenv()
  ]
};
