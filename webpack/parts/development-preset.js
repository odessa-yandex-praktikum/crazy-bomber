const devCSSPreset = require('../presets/css-preset-dev');
const webpackBundleAnalyzer = require('../plugins/webpack-bundle-analyzer-plugin');
const webpack = require('webpack');

module.exports = () => ({
    mode: 'development',
    entry: [
        /** Добавляет скрипт на клиенте, который коннектит к HMR-мидлваре. */
        'webpack-hot-middleware/client',
    ],
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [devCSSPreset()],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        webpackBundleAnalyzer({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: {source: false},
        }),
    ],
});
