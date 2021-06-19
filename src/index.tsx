import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {store} from './store';
import {startServiceWorker} from './utils/service-worker';

if (process.env.NODE_ENV === 'production') {
    startServiceWorker();
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
