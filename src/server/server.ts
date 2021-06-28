import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackFn from '../../webpack.config';
import {webpackDev} from './middlewares/webpack-dev';
import {webpackHot} from './middlewares/webpack-hot';

const inputMode = process.argv.find((arg) => !arg.indexOf('--mode'))?.slice(7);
const mode: 'development' | 'production' =
    inputMode === 'development' ? 'development' : 'production';
const isDev = mode === 'development';

const app = express();
const PORT = 5000;
const config = webpackFn(null, {mode});
const compiler = webpack(config);

isDev && app.use('/', [webpackDev(compiler), webpackHot(compiler)]);

app.use(express.static(path.resolve('dist')));

app.use('/', (_req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}`);
});
