import {processingRequest} from './common';

const url = 'https://ya-praktikum.tech/api/v2/';
const apiHost = {
    getServiceID: 'oauth/yandex/service-id?redirect_uri=http://localhost:3000',
    signInWithYandex: 'oauth/yandex',
};

export function apiGetServiceID(): Promise<Response> {
    return fetch(url + apiHost.getServiceID, {
        method: 'GET',
        credentials: 'include',
        headers: {
            accept: 'application/json',
        },
    }).then((response) => processingRequest(response));
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
            redirect_uri: 'http://localhost:3000',
        }),
    }).then((response) => processingRequest(response));
}

