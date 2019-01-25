import fetch from 'isomorphic-fetch';
import {saveAs} from 'file-saver';

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

    changeUserPassword: (token, id, password) => {
        const data = {password};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `/api/v1/users/${id}/changePassword`;
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

    createInspector: (token, login, password, name) => {
        const data = {login, password, name};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/inspectors';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getInspectorById: (token, inspector_id) => {
        const opt = {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/inspectors/${inspector_id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                console.log(promise);
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getInspectorByUserId: (token, user_id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/inspectors/user/${user_id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                console.log(promise);
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updateInspectorById: (token, id, name) => {
        const data = {name};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `/api/v1/inspectors/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deleteInspectorById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/inspectors/${id}`;
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

    createConsumer: (token, login, password, name, email) => {
        const data = {login, password, name, email};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/consumers';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getConsumerById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/consumers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updateConsumerById: (token, id, name, email) => {
        const data = {name, email};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `/api/v1/consumers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deleteConsumerById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/consumers/${id}`;
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

    getAllMetersNotInPlace: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/meters/notInPlace';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createMeter: (token, number) => {
        const data = {number: number};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/meters';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getMeterById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/meters/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updateMeterById: (token, id, number) => {
        const data = {number};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `/api/v1/meters/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deleteMeterById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/meters/${id}`;
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

    getAllPlacesForAudit: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = '/api/v1/places/audit';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createPlace: (token, name, isSignNeed, consumer_id, meter_id) => {
        const data = {name, isSignNeed, consumer_id, meter_id};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/places';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getPlaceById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/places/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updatePlaceById: (token, id, name, isSignNeed, consumer_id, meter_id) => {
        const data = {name, isSignNeed, consumer_id, meter_id};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `/api/v1/places/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deletePlaceById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/places/${id}`;
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
    },

    getReportById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/reports/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getReportByIdPdf: (token, report_id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                'Authorization': `BEARER ${token}`
            },
            responseType: 'blob'
        };
        const url = `/api/v1/reports/${report_id}/pdf`;
        return fetch(url, opt)
            .then(response => response.blob())
            .then(blob => saveAs(blob, `report-${Date.now()}.pdf`));
    },

    getAllReportsByInspectorId: (token, inspector_id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/reports?inspector_id=${inspector_id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createReport: (token, inspector_id, place_id, sign_id, date, value) => {
        const data = {inspector_id, place_id, sign_id, date, value};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/reports';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updateReportById: (token, id, value) => {
        const data = {value};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `/api/v1/reports/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllDataByMeterId: (token, meter_id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `/api/v1/data?meter_id=${meter_id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createData: (token, meter_id, date, value) => {
        const data = {date, value, meter_id};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = '/api/v1/data';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    }
};

export default api;