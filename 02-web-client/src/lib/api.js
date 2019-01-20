import fetch from 'isomorphic-fetch';

const api = {
    login: (login, password) => {
        const data = {login, password};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/auth/login';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    }
};

export default api;