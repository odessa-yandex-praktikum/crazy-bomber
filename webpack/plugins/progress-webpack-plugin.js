const webpack = require("webpack");

/**
 * Плагин для отображения прогресса компиляции проекта.
 *
 * @see https://webpack.js.org/plugins/progress-plugin/
 */
const createWebpackProgressPlugin = (options) => {
    return new webpack.ProgressPlugin(options);
};

module.exports = createWebpackProgressPlugin;
