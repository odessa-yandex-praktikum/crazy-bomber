const HtmlWebpackPlugin = require("html-webpack-plugin");

/** 
 * Плагин упрощает создание HTML-файлов, добавляя выходные бандлы.
 *
 * @see https://webpack.js.org/plugins/html-webpack-plugin/
 */
const createHTMLWebpackPlugin = (options) => { 
    return new HtmlWebpackPlugin(options);
};

module.exports = createHTMLWebpackPlugin;
