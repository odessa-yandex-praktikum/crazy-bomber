export const processingRequest = (response: Response) => {
    if (response.status === 200) {
        return response;
    } else {
        return response.json().then((result: {reason: string}) => {
            throw Error(result?.reason);
        });
    }
};
