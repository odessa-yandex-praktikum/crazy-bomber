// Presets
const imgPreset = require('../presets/img-preset');
const fontPreset = require('../presets/font-preset');
const jsxPreset = require('../presets/jsx-preset');
const tsxPreset = require('../presets/tsx-preset');

// Plugins
const createHTMLWebpackPlugin = require('../plugins/html-webpack-plugin');
const createWebpackProgressPlugin = require('../plugins/progress-webpack-plugin');

module.exports = () => ({
    module: {
        rules: [imgPreset(), fontPreset(), jsxPreset(), tsxPreset()],
    },
    plugins: [
        createHTMLWebpackPlugin({
            template: 'src/assets/html/index.html',
        }),
        createWebpackProgressPlugin(),
    ],
});
