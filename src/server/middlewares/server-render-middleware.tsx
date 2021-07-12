import * as express from 'express';
import path from 'path';
import {StaticRouterContext} from 'react-router';
import {ChunkExtractor} from '@loadable/server';
import {getClientHtml} from '../../index.server';
import {configureStore, getInitialState, IAppState} from '../../store';

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
 * TODO: Что надо доделать:
 *  Мидлвар, проверяющий авторизацию пользователя.
 *      + установка пользователя в стор.
 *  При попадании в здание происходит подгрузка аудио каждый раз.
 *  Добавить https.
 */
export default (req: express.Request, res: express.Response) => {
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

    const reactHtml = getClientHtml({store, context, location, chunkExtractor});
    const reduxState = store.getState();

    res.status(context.statusCode || 200).send(makeHTMLPage(reactHtml, reduxState, chunkExtractor));
};
