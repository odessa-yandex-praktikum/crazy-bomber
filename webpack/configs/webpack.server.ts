import * as path from 'path';
import {Configuration} from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

export default function (mode: 'development' | 'production'): Configuration {
    console.log('[server built in mode]: ', mode);
    return {
        mode,
        name: 'server',
        target: 'node',
        node: {__dirname: false},
        entry: path.posix.resolve('src/server/server.ts'),
        module: {
            /**
             * Собирать CSS, картинки и прочее медиа на сервере не нужно.
             * Это делается с помощью null-loader.
             */
            rules: [
                {
                    test: /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/,
                    loader: 'null-loader',
                },
                {
                    test: /\.css$/,
                    loader: 'null-loader',
                },
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: {loader: 'babel-loader'},
                },
                {
                    test: /\.(mp3|wav|mpe?g|ogg)$/,
                    loader: 'null-loader',
                },
            ],
        },
        output: {
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            path: path.posix.resolve('dist'),
            publicPath: path.posix.resolve(__dirname, '/'),
        },
        resolve: {
            modules: ['src', 'node_modules'],
            extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        },

        devtool: 'source-map',

        performance: {
            hints: mode === 'development' ? false : 'warning',
        },

        /**
         * Код из стандартных библиотек типа path, fs и из node_modules библиотек
         * собирать не нужно. Делается это с помощью плагина webpack-node-externals.
         */
        externals: [nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]})],

        optimization: {nodeEnv: false},
    };
}
