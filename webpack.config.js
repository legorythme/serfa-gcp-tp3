const path = require("path");

/**
 * basically, we take Node.JS code that the browser does not understand,
 * and we transpile it into the `html/javascript` folder so that the browser can execute it
 */
module.exports = {
  // The entry point file described above
  entry: "./src/index.js",
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, "public/javascript"),
    filename: "frontend-bundle.js",
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: "eval-source-map",
};
