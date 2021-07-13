import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as express from 'express';
import {Router} from 'express';
import * as path from 'path';
import {
    getThemeHandler,
    getUserTheme,
    updateThemeHandler,
    writeNewTheme,
    writeThemeHandler,
} from './controllers/theme';
import {sequelize} from './db/db';
import {getWebpackMiddlewares} from './middlewares';

/**
 * Определение режима сборки по аргументам запуска команды.
 */
const inputMode = process.argv.find((arg) => !arg.indexOf('--mode'))?.slice(7);
const mode: 'development' | 'production' =
    inputMode === 'development' ? 'development' : 'production';

console.log('[server started in mode]: ', mode);

const app = express();
const router: Router = Router();
const PORT = 3000;

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

/**
 * Отдаём статику приложения.
 */
app.use(express.static(path.posix.resolve('dist')));

/**
 * На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения.
 */
app.get('/*', getWebpackMiddlewares(mode));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/get-theme', getThemeHandler);
app.post('/write-user-theme', writeThemeHandler);
app.post('/update-user-theme', updateThemeHandler);
app.get('/get-user-theme', getUserTheme);
app.get('/write-new-theme', writeNewTheme);

app.disable('x-powered-by').enable('trust proxy').use(cookieParser()).use(router);

/**
 * Запуск приложения.
 */
app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}`);
    sequelize
        .sync()
        .then(() => console.log(`PostgreSQL is successfully connected`))
        .catch((error) => console.log(error));
});
