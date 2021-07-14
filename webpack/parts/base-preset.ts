// Presets
import {Configuration} from 'webpack';
import LoadablePlugin from '@loadable/webpack-plugin';

const imgPreset = require('../presets/img-preset');
const fontPreset = require('../presets/font-preset');
const jsxPreset = require('../presets/jsx-preset');
const tsxPreset = require('../presets/tsx-preset');
const audioPreset = require('../presets/audio-preset');

// Plugins
const createWebpackProgressPlugin = require('../plugins/progress-webpack-plugin');

export default function (_mode: 'development' | 'production'): Configuration {
    return {
        module: {
            rules: [imgPreset(), fontPreset(), jsxPreset(), tsxPreset(), audioPreset()],
        },
        plugins: [createWebpackProgressPlugin(), new LoadablePlugin()],
    };
}
