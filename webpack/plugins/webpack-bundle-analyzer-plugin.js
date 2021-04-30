const WebpackBundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/**
 * Плагин для анализа размера получившегося бандла.
 *
 * @see https://github.com/webpack-contrib/webpack-bundle-analyzer
 */
const createWebpackBundleAnalyzer = (options) => {
    return new WebpackBundleAnalyzerPlugin(options);
}

module.exports = createWebpackBundleAnalyzer;
