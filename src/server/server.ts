import * as express from 'express';
import * as path from 'path';
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
const PORT = 3000;

/**
 * Отдаём статику приложения.
 */
app.use(express.static(path.posix.resolve('dist')));

/**
 * На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения.
 */
app.get('/*', getWebpackMiddlewares(mode));

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
