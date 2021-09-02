import * as express from 'express';
import * as https from 'https';
import path from 'path';
import {StaticRouterContext} from 'react-router';
import {ChunkExtractor} from '@loadable/server';
import {getClientHtml} from '../../index.server';
import {configureStore, getInitialState, IAppState} from '../../store';
import {UserActionTypes, UserData} from '../../store/types/user';

const makeHTMLPage = (
    content: string,
    reduxState: IAppState,
    chunkExtractor: ChunkExtractor
): string => {
    const scriptTags = chunkExtractor.getScriptTags();
    const linkTags = chunkExtractor.getLinkTags();
    const styleTags = chunkExtractor.getStyleTags();

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Bomber Game</title>
        ${linkTags}
        ${styleTags}
    </head>
    <body>
        <div id="root">${content}</div>
        <script>
            /**
             * Записываем состояние редакса, сформированное на стороне сервера в window.
             * На стороне клиента применим это состояние при старте
             */
            window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        ${scriptTags}
    </body>
    </html>
`;
};

/**
 * Возвращает статику.
 *
 * @description Так же предзаполняет стор данными пользователя, если они есть.
 */
const responseFn = (req: express.Request, res: express.Response, userData: UserData | null) => {
    /**
     * В файле loadable-stats.json (который генерируется при сборке), хранится дерево
     * зависимостей компонентов и чанков.
     *
     * С помощью него добавляются бандлы в html-страницу, отдаваемую клиенту.
     */
    const statsFile = path.posix.resolve('dist/loadable-stats.json');

    /**
     * chunkExtractor содержит всю информацию о js и ccs-файлах, которые необходимо подключить.
     * Поэтому вместо явного указания файлов, используем информацию из этой переменной.
     */
    const chunkExtractor = new ChunkExtractor({statsFile});

    /**
     * На сервере нет доступа к location и history объектам, из-за чего нет возможности использовать компонент Router.
     * Но можно использовать StaticRouter, в который мы можем явно передать текущий url из запроса.
     */
    const location = req.url;
    const context: StaticRouterContext = {};

    const {store} = configureStore(getInitialState(location), location);

    if (userData) {
        store.dispatch({
            type: UserActionTypes.USER_AUTH_SUCCESS,
            loggingIn: true,
            currentUser: userData,
        });
    }

    const reactHtml = getClientHtml({store, context, location, chunkExtractor});
    const reduxState = store.getState();

    res.status(context.statusCode || 200).send(makeHTMLPage(reactHtml, reduxState, chunkExtractor));
};

/**
 * Миддлварь, проверяющий наличие авторизационной куки.
 *
 * @description Если кука есть, то запрос проксируется к api yandex'а за данными о пользователя.
 *  По итогу вызывается функция, которая возвращает статику.
 */
export default (req: express.Request, res: express.Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.cookies?.authCookie) {
        const options = {
            method: 'GET',
            credentials: 'include',
            host: 'ya-praktikum.tech',
            path: '/api/v2/auth/user',
            port: 443,
            rejectUnauthorized: false,
            headers: {
                accept: 'application/json',
                cookie: req.headers.cookie,
            },
        };

        const httpreq = https.request(options, function (response) {
            response.setEncoding('utf8');

            response.on('data', function (user) {
                const userData =
                    response.statusCode === 200 ? (JSON.parse(user) as UserData) : null;

                responseFn(req, res, userData);
            });
        });

        httpreq.end();
    } else {
        responseFn(req, res, null);
    }
};
