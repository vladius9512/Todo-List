const path = require("path");

var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/images", to: "images" },
                { from: "src/styles", to: "styles" },
            ],
        }),
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
};
