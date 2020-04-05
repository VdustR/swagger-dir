const webpack = require("webpack");
const webpackConfig = require("./webpackConfig");

const compiler = webpack(webpackConfig());

console.log("JS building...");
compiler.run((err, stats) => {
  if (err) throw err;
  console.log("JS built successfully!");
});
