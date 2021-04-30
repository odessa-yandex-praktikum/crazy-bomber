const urlLoader = require("../loaders/url-loader");

const fontPreset = () => ({
    test: /\.(|eot|ttf|woff|woff2)$/,
    use: [
        urlLoader(
            {
                limit: 5000,
                name: 'fonts/[hash].[ext]'
            }
        )
    ]
});

module.exports = fontPreset;
