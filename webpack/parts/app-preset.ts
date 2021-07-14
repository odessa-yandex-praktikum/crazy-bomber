import {Configuration} from 'webpack';
import * as path from 'path';

export default function (_mode: 'development' | 'production'): Configuration {
    return {
        entry: [path.posix.resolve('src/index.client.tsx')],
        output: {
            filename: 'bundle.js',
            path: path.posix.resolve('dist'),
            publicPath: path.posix.resolve(__dirname, '/'),
        },
        resolve: {
            /** Почему сначала резолвим ts и tsx: https://github.com/webpack/webpack/issues/2404 */
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                assets: path.posix.resolve('src/assets/'),
                components: path.posix.resolve('src/components/'),
                src: path.posix.resolve('src/'),
            },
        },
    };
}
