import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouterContext} from 'react-router';
import {StaticRouter} from 'react-router-dom';
import {Store} from 'redux';
import {ChunkExtractor} from '@loadable/server';
import {App} from './App';
import {IAppState} from './store';

export const getClientHtml = ({
    context,
    location,
    store,
    chunkExtractor,
}: {
    context: StaticRouterContext;
    location: string;
    store: Store<IAppState>;
    chunkExtractor: ChunkExtractor;
}) => {
    return renderToString(
        chunkExtractor.collectChunks(
            <Provider store={store}>
                <StaticRouter context={context} location={location}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    );
};
