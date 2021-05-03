const path = require('path');

module.exports = () => ({
    entry: {
        app: path.resolve('src/index.tsx'),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        // очищает dist-директорию перед каждой сборкой.
        clean: true,
    },
    resolve: {
        // Почему сначала резолвим ts и tsx: https://github.com/webpack/webpack/issues/2404
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            Components: path.resolve('src/Components/'),
        },
    },
});
