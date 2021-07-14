import * as webpack from 'webpack';
const devCSSPreset = require('../presets/css-preset-dev');
const webpackBundleAnalyzer = require('../plugins/webpack-bundle-analyzer-plugin');

/**
 * Пресет для продакшн-сборки клиентской части.
 */
export default function (): webpack.Configuration {
    return {
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
    };
}
