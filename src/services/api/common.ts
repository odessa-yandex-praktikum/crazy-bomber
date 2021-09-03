import {isServer} from '../../utils/Utils';

export const processingRequest = (response: Response) => {
    if (response.status === 200) {
        return response;
    }
    if (response.status === 404) {
        throw Error(response.statusText);
    } else {
        return response.json().then((result: {reason: string}) => {
            throw Error(result?.reason);
        });
    }
};

export function getFetchToJson<T = any>(
    url: string,
    method = 'GET',
    body?: any
): Promise<T> | Promise<void> {
    const options: RequestInit = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (!isServer()) {
        return fetch(url, options)
            .then((response) => processingRequest(response))
            .then((r: Response) => r.json());
    } else {
        return Promise.resolve();
    }
}
