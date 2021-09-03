import {routerMiddleware, RouterState} from 'connected-react-router';
import {History, createBrowserHistory, createMemoryHistory} from 'history';
import {applyMiddleware, compose, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {initialState as forumInitialState} from '../store/reducers/forumReducer';
import {initialState as leaderboardInitialState} from '../store/reducers/leaderboardReducer';
import {initialState as userInitialState} from '../store/reducers/userReducer';
import {isServer} from '../utils/Utils';
import {getInitialReducer} from './reducers';
import {ForumState} from './reducers/forumReducer';
import {LeaderboardState} from './reducers/leaderboardReducer';
import {UserState} from './types/user';

export interface IAppState {
    readonly user: UserState;
    readonly leaderboard: LeaderboardState;
    readonly forum: ForumState;
    readonly router: RouterState<any>;
}

/**
 * Подключение compose-функции с redux-dev-tools, если это возможно.
 */
const getCompose = (): typeof compose => {
    if (process.env.NODE_ENV !== 'production' && !isServer()) {
        return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    return compose;
};

interface IStoreConfig {
    store: Store<IAppState>;
    history: History;
}

/**
 * Получение изначального стора.
 */
export const getInitialState = (pathname = '/'): IAppState => {
    return {
        user: userInitialState,
        leaderboard: leaderboardInitialState,
        forum: forumInitialState,
        router: {
            location: {pathname, search: '', hash: '', key: ''},
            action: 'POP',
        } as RouterState,
    };
};

export const configureStore = (initialState: IAppState, url = '/'): IStoreConfig => {
    const history = isServer()
        ? createMemoryHistory({initialEntries: [url]})
        : createBrowserHistory();

    const composeEnhancers = getCompose();

    const middlewares = [routerMiddleware(history), thunk];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const store: Store<IAppState> = createStore<IAppState, any, any, any>(
        getInitialReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    return {store, history};
};
