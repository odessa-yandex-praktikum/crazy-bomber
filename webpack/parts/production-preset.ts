import {Configuration} from 'webpack';

const prodCSSPreset = require('../presets/css-preset-prod');
const createMiniCssExtractPlugin = require('../plugins/mini-css-extract-plugin');

/**
 * Пресет для прод-сборки.
 */
export default function (): Configuration {
    return {
        mode: 'production',
        module: {
            rules: [prodCSSPreset()],
        },
        plugins: [createMiniCssExtractPlugin()],
    };
}
