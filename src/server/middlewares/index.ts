import * as express from 'express';
import * as webpack from 'webpack';
import webpackClientFn from '../../../webpack/configs/webpack.client';
import serverRenderMiddleware from './server-render-middleware';
import {webpackDev} from './webpack-dev';
import {webpackHot} from './webpack-hot';

/**
 * Функция возвращает все middleware.
 */
export function getWebpackMiddlewares(
    mode: 'development' | 'production'
): express.RequestHandler[] {
    const config = webpackClientFn(mode);
    const compiler = webpack(config);

    const middlewares = [];
    console.log('\n[middlewares]:');
    if (mode === 'development') {
        console.log('   webpack-dev-middleware');
        middlewares.push(webpackDev(compiler));
        console.log('   webpack-hot-middleware');
        middlewares.push(webpackHot(compiler));
    }

    console.log('   server-render-middleware');
    middlewares.push(serverRenderMiddleware);

    return middlewares;
}
