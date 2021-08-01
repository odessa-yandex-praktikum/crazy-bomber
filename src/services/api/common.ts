export const processingRequest = (response: Response) => {
    if (response.status === 200) {
        return response;
    } else {
        return response.json().then((result: {reason: string}) => {
            throw Error(result?.reason);
        });
    }
};

export function getFetchToJson(url: string): Promise<{}> {
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            accept: 'application/json',
        },
    })
        .then((response) => processingRequest(response))
        .then((r: Response) => r.json());
}
