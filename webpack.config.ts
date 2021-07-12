import clientConfig from './webpack/configs/webpack.client';
import serverConfig from './webpack/configs/webpack.server';

export default function (_env: any, {mode}: {mode: 'development' | 'production'}) {
    return [clientConfig(mode), serverConfig(mode)];
}
