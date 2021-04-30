const path = require('path');
const devCSSPreset = require('../presets/css-preset-dev');
const webpackBundleAnalyzer = require('../plugins/webpack-bundle-analyzer-plugin');

module.exports = () => ({
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            devCSSPreset()
        ],
    },
    plugins: [
        webpackBundleAnalyzer({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: {source: false},
        }),
    ],
    devServer: {
        contentBase: path.resolve('dist'),
        compress: true,
        port: 3003,
        hot: true,
    },
});
