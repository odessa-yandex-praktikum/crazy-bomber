const path = require('path');

module.exports = () => ({
    entry: [path.resolve('src/index.tsx')],
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist'),
        /** Очищает dist-директорию перед каждой сборкой. */
        clean: true,
        publicPath: path.resolve(__dirname, '/'),
    },
    resolve: {
        /** Почему сначала резолвим ts и tsx: https://github.com/webpack/webpack/issues/2404 */
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            Assets: path.resolve('src/assets/'),
            Components: path.resolve('src/components/'),
            src: path.resolve('src/'),
        },
    },
});
