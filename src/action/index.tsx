import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {apiGetServiceID, apiSignInWithYandex} from '../services/api/oauth-api';
import {userActions} from '../store/actions/userActions';
import {isServer} from '../utils/Utils';

const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=`;
const redirect =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://odessa-crazyboomber-5.ya-praktikum.tech';

export function yandexLogin() {
    if (!isServer()) {
        void apiGetServiceID().then((response) => {
            const serviceId = response['service_id'] as string;
            location.assign(url + serviceId + '&redirect_uri=' + redirect);
        });
    }
}

export function getUserOauth(): string {
    if (!isServer()) {
        const dispatch = useDispatch();
        const history = useHistory();
        const queryString = location.search;
        const params = new URLSearchParams(queryString);
        const code = params.get('code');
        if (code) {
            void apiSignInWithYandex(code).then(() => dispatch(userActions.getUser(history)));
        }
    }
    return '/start';
}
