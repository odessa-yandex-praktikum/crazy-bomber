// Presets
const imgPreset = require("../presets/img-preset");
const fontPreset = require("../presets/font-preset");
const jsxPreset = require("../presets/jsx-preset");
const tsxPreset = require("../presets/tsx-preset");
const audioPreset = require("../presets/audio-preset");

// Plugins
const createHTMLWebpackPlugin = require("../plugins/html-webpack-plugin");
const createWebpackProgressPlugin = require("../plugins/progress-webpack-plugin");

module.exports = () => ({
    module: {
        rules: [
            imgPreset(),
            fontPreset(),
            jsxPreset(),
            tsxPreset(),
            audioPreset(),
        ],
    },
    plugins: [
        createHTMLWebpackPlugin({
            title: "React boilerplate",
            template: "src/assets/html/index.html"
        }),
        createWebpackProgressPlugin()
    ]
})
