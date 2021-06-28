const urlLoader = require("../loaders/url-loader");

const audioPreset = () => ({
    test: /\.(mp3|wav|mpe?g|ogg)$/,
    use: [
        urlLoader(
            {
                limit: 5000,
                name: 'audio/[hash].[ext]'
            }
        )
    ]
});

module.exports = audioPreset;
