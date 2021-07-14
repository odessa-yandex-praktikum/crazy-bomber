import {ConnectedRouter} from 'connected-react-router';
import * as React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import {compose} from 'redux';
import {loadableReady} from '@loadable/component';
import {App} from './App';
import {configureStore, IAppState} from './store';
import {startServiceWorker} from './utils/service-worker';

if (process.env.NODE_ENV === 'production') {
    startServiceWorker();
} else {
    /** Принудительная перезагрузка для hmr */
    module?.hot?.accept?.();
}

declare global {
    interface Window {
        __INITIAL_STATE__: IAppState;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const {store, history} = configureStore(window.__INITIAL_STATE__);

void loadableReady(() => {
    hydrate(
        <Provider store={store}>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document?.getElementById('root')
    );
});
