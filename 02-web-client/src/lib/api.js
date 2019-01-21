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
    },

    getAllUsers: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/users';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllInspectors: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/inspectors';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllConsumers: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/consumers';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllMeters: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/meters';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllPlaces: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/places';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllReports: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/reports';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    }
};

export default api;