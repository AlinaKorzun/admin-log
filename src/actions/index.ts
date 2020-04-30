export const http = (url: string, method: string, body?: any) => {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        // params: body,
    });
};

export const url = '';


