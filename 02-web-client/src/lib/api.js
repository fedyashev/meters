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
        const url = 'api/v1/auth/login';
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
        const url = 'api/v1/users';
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
        const url = `api/v1/users/${id}/changePassword`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllInspectors: (token, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/inspectors?limit=${limit}&offset=${offset}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getCountInspectors: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = 'api/v1/inspectors/count';
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
        const url = 'api/v1/inspectors';
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
        const url = `api/v1/inspectors/${inspector_id}`;
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
        const url = `api/v1/inspectors/user/${user_id}`;
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
        const url = `api/v1/inspectors/${id}`;
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
        const url = `api/v1/inspectors/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllConsumers: (token, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const params = [];
        if (limit) params.push(`limit=${limit}`);
        if (!isNaN(offset)) params.push(`offset=${offset}`);
        const url = `api/v1/consumers?${params.join('&')}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getCountConsumers: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = 'api/v1/consumers/count';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createConsumer: (token, login, password, name, email, phone) => {
        const data = {login, password, name, email, phone};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = 'api/v1/consumers';
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
        const url = `api/v1/consumers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updateConsumerById: (token, id, name, email, phone) => {
        const data = {name, email, phone};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `api/v1/consumers/${id}`;
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
        const url = `api/v1/consumers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });  
    },

    getAllMeters: (token, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/meters?limit=${limit}&offset=${offset}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getCountMeters: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = 'api/v1/meters/count';
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
        const url = 'api/v1/meters/notInPlace';
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
        const url = 'api/v1/meters';
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
        const url = `api/v1/meters/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getMeterQRcodePngById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                'Authorization': `BEARER ${token}`
            },
            responseType: 'blob'
        };
        const url = `api/v1/meters/${id}/qrcode`;
        return fetch(url, opt)
            .then(response => response.blob())
            .then(blob => saveAs(blob, `qrcode-id-${id}.png`));
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
        const url = `api/v1/meters/${id}`;
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
        const url = `api/v1/meters/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getCountPlaces: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = 'api/v1/places/count';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllPlaces: (token, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/places?limit=${limit}&offset=${offset}`;
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
        const url = 'api/v1/places/audit';
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
        const url = 'api/v1/places';
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
        const url = `api/v1/places/${id}`;
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
        const url = `api/v1/places/${id}`;
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
        const url = `api/v1/places/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllReports: (token, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/reports?limit=${limit}&offset=${offset}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getCountReports: (token, inspector_id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/reports/count?inspector_id=${inspector_id || ""}`;
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
        const url = `api/v1/reports/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getReportByIdPdf: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                'Authorization': `BEARER ${token}`
            },
            responseType: 'blob'
        };
        const url = `api/v1/reports/${id}/pdf`;
        return fetch(url, opt)
            .then(response => response.blob())
            .then(blob => saveAs(blob, `report-${Date.now()}.pdf`));
    },

    getAllReportsByInspectorId: (token, inspector_id, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/reports?inspector_id=${inspector_id}&limit=${limit}&offset=${offset}`;
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
        const url = 'api/v1/reports';
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
        const url = `api/v1/reports/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deleteReportById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/reports/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllDataByMeterId: (token, meter_id, limit, offset) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/data?meter_id=${meter_id || ""}&offset=${offset}&limit=${limit}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getCountDatas: (token, meter_id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/data/count?meter_id=${meter_id || ""}`;
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
        const url = 'api/v1/data';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createSign: (token, data) => {
        const formData = new FormData();
        formData.append('sign', data, `sing-${Date.now()}.png`);
        const opt = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `BEARER ${token}`
            },
            body: formData
        };
        const url = 'api/v1/signs';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deleteSignById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/signs/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    sendReport: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/reports/${id}/sendEmail`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getAllRegisters: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/registers`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    createRegister: (token, name, group_abonent_id, sub_abonentes) => {
        console.log(name, group_abonent_id, sub_abonentes);
        const data = {name, group_abonent_id, sub_abonentes: sub_abonentes};
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = 'api/v1/registers';
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    getRegisterById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/registers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    updateRegisterById: (token, id, name, group_abonent_id, sub_abonentes) => {
        console.log(name, group_abonent_id, sub_abonentes);
        const data = {name, group_abonent_id, sub_abonentes: sub_abonentes};
        const opt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            },
            body: JSON.stringify(data)
        };
        const url = `api/v1/registers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    deleteRegisterById: (token, id) => {
        const opt = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        };
        const url = `api/v1/registers/${id}`;
        return fetch(url, opt)
            .then(res => {
                const promise = res.json();
                return res.ok ? promise : promise.then(err => {throw err});
            });
    },

    downloadXlsxRegisterById: (token, id) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xlsx',
                'Authorization': `BEARER ${token}`
            },
            responseType: 'blob'
        };
        const url = `api/v1/registers/${id}/xlsx`;
        return fetch(url, opt)
            .then(response => response.blob())
            .then(blob => saveAs(blob, `register-${Date.now()}.xlsx`));
    },

    downloadXlsxAllRegisters: (token) => {
        const opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xlsx',
                'Authorization': `BEARER ${token}`
            },
            responseType: 'blob'
        };
        const url = `api/v1/registers/xlsx`;
        return fetch(url, opt)
            .then(response => response.blob())
            .then(blob => saveAs(blob, `register-${Date.now()}.xlsx`));
    },

    act_01: {
        getAll: (token, limit, offset) => {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                }
            };
            const url = `api/v1/doc/act_01?limit=${limit}&offset=${offset}`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    
        count: (token, inspector_id) => {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                }
            };
            const url = `api/v1/doc/act_01/count?inspector_id=${inspector_id || ""}`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    
        getById: (token, id) => {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                }
            };
            const url = `api/v1/doc/act_01/${id}`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    
        getPdfById: (token, id) => {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                    'Authorization': `BEARER ${token}`
                },
                responseType: 'blob'
            };
            const url = `api/v1/doc/act_01/${id}/pdf`;
            return fetch(url, opt)
                .then(response => response.blob())
                .then(blob => saveAs(blob, `act-${Date.now()}.pdf`));
        },
    
        getAllByInspectorId: (token, inspector_id, limit, offset) => {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                }
            };
            const url = `api/v1/doc/act_01?inspector_id=${inspector_id}&limit=${limit}&offset=${offset}`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    
        create: (token, inspector, consumer, place, meter, sign_id, date, value) => {
            const data = {inspector, consumer, place, meter, sign_id, date, value};
            const opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                },
                body: JSON.stringify(data)
            };
            const url = 'api/v1/doc/act_01';
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    
        updateById: (token, id, value) => {
            const data = {value};
            const opt = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                },
                body: JSON.stringify(data)
            };
            const url = `api/v1/doc/act_01/${id}`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    
        deletetById: (token, id) => {
            const opt = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                }
            };
            const url = `api/v1/doc/act_01/${id}`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },

        sendEmailById: (token, id) => {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`
                }
            };
            const url = `api/v1/doc/act_01/${id}/sendEmail`;
            return fetch(url, opt)
                .then(res => {
                    const promise = res.json();
                    return res.ok ? promise : promise.then(err => {throw err});
                });
        },
    },

};

export default api;