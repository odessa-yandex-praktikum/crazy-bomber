import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {apiGetServiceID, apiSignInWithYandex} from '../services/api/oauth-api';
import {userActions} from '../store/actions/userActions';

const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=`;
/** Прописать в callback Yandex OAuth redirect_uri для продакшен сборки https://mysterious-sea-19392.herokuapp.com/ */
const redirect =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3000 ' : 'http://localhost:3000 ';

export function yandexLogin() {
    apiGetServiceID()
        .then((response) => response?.json())
        .then((response: Promise<string>) => {
            const serviceId: string = response['service_id'];
            location.assign(url + serviceId + '&redirect_uri=' + redirect);
        });
}

export function getUserOauth(): string {
    const dispatch = useDispatch();
    const history = useHistory();
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const code = params.get('code');
    if (code) {
        apiSignInWithYandex(code).then(() => dispatch(userActions.getUser(history)));
    }
    return '/start';
}
