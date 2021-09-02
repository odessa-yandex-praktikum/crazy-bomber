import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as express from 'express';
import {Express, Router} from 'express';
import * as path from 'path';
import {forumController} from './controllers/forum';
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

const app: Express = express();
const router: Router = Router();
const PORT = 3000;
const forumService = forumController();

app.use(
    cors({
        origin:  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://odessa-crazyboomber-5.ya-praktikum.tech',
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

(async function () {
    await sequelize.sync();
    app.listen(PORT, function () {
        console.log(`Open http://localhost:${PORT}!`);
    });
})();

app.get('/get-theme', getThemeHandler);
app.post('/write-user-theme', writeThemeHandler);
app.post('/update-user-theme', updateThemeHandler);
app.get('/get-user-theme', getUserTheme);
app.get('/write-new-theme', writeNewTheme);

app.get('/forum', forumService.getAllTopics);
app.get('/forum/topic/:id', forumService.getTopic);
app.post('/forum', forumService.addTopic);
app.post('/forum/topic/:id/like', forumService.addTopicLike);
app.post('/forum/topic/:id/reply', forumService.replyToTopic);
app.get('/forum/topic/:id/messages', forumService.getAllMessagesForTopic);


/**
 * Отдаём статику приложения.
 */
app.use(express.static(path.posix.resolve('dist')));

app.disable('x-powered-by').enable('trust proxy').use(cookieParser()).use(router);

/**
 * На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения.
 */
app.get('/*', getWebpackMiddlewares(mode));
