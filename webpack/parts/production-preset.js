const prodCSSPreset = require('../presets/css-preset-prod');
const createMiniCssExtractPlugin = require('../plugins/mini-css-extract-plugin');

module.exports = () => ({
    mode: 'production',
    module: {
        rules: [prodCSSPreset()],
    },
    plugins: [createMiniCssExtractPlugin()],
});
