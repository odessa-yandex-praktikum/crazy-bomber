import {getFetchToJson, processingRequest} from './common';

const url = 'https://ya-praktikum.tech/api/v2/';
const apiHost = {
    getServiceID: 'oauth/yandex/service-id?redirect_uri=http://localhost:3000',
    signInWithYandex: 'oauth/yandex',
};

export function apiGetServiceID(): Promise<{}> {
    return getFetchToJson(url + apiHost.getServiceID);
}

export function apiSignInWithYandex(code: string): Promise<Response> {
    return fetch(url + apiHost.signInWithYandex, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            code: code,
            redirect_uri:  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://localhost:3000',
        }),
    }).then((response) => processingRequest(response));
}
