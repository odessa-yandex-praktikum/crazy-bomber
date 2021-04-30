const babelLoader = require("../loaders/babel-loader");

const tsxPreset = () => ({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [babelLoader()]
});

module.exports = tsxPreset;
