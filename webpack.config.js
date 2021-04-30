const {merge} = require('webpack-merge');
const appPreset = require('./webpack/parts/app-preset.js');
const basePreset = require('./webpack/parts/base-preset.js');

/**
 * В зависимости от режима подгружаем нужный пресет.
 */
const webpackMode = (mode) => require(`./webpack/parts/${mode}-preset.js`)(mode);

module.exports = (_env, {mode}) => merge(appPreset(),
    basePreset(),
    webpackMode(mode)
);
