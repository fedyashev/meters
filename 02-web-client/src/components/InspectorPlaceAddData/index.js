import React, { Component } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { prettyDate, formatDate } from '../../lib/helpers';
import CanvasSign from '../CanvasSign';
import { timingSafeEqual } from 'crypto';
//import b64ToBlob from 'b64-to-blob';

class InspectorPlaceAddData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            inspector: props.inspector,
            place: {
                id: props.match.params.place_id
            },
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const place_id = this.state.place.id;
        api.getPlaceById(token, place_id)
            .then(
                place => {
                    if (place) {
                        this.setState({ ...this.state, place, isLoaded: true });
                    }
                    else {
                        this.props.showWarningAlert('Место не найдено');
                        this.props.history.goBack();
                    }
                },
                ({ error }) => {
                    this.props.showWarningAlert(error.message);
                    this.props.history.goBack();
                }
            );
    }

    handleCreateReport = async (value, signData) => {
        console.log(value);
        const { place } = this.state;
        if (!place.meter) {
            return this.props.showWarningAlert("Отсутствует счетчик");
        }
        if (Number.isNaN(value)) {
            return this.props.showWarningAlert('Некорректные показания');
        }
        if (place.meter && place.meter.lastData && (value < Number(place.meter.lastData.value))) {
            return this.props.showWarningAlert('Некорректные показания');
        }
        if (this.state.place.isSignNeed && !signData) {
            return this.props.showWarningAlert('Отсутствует подпись');
        }

        const token = this.state.user.token;
        const inspector_id = this.state.inspector.id;
        const place_id = this.state.place.id;
        const date = formatDate(Date.now());
        let sign_id = null;

        let sign = null;
        let report = null;
        try {
            if (this.state.place.isSignNeed) {
                sign = await api.createSign(token, signData);
                sign_id = sign.id;
            }
            report = await api.createReport(token, inspector_id, place_id, sign_id, date, value);
        } catch ({error}) {
            if (sign) api.deleteSignById(token, sign.id).then(() => {});
            return this.props.showWarningAlert(error.message);
        }

        if (!report) {
            this.props.showWarningAlert('Неудалось создать отчет')
        }
        else {
            this.props.showSuccessAlert('Отчет создан');
            this.props.history.goBack();
        }
    };

    render() {
        let val, cons, canvas;
        if (!this.state.isLoaded) return null;
        const { place } = this.state;

        const onClickCreateReport = e => {
            e.preventDefault();

            if (!this.state.place.isSignNeed) {
                return this.handleCreateReport(val.value, null);
            }

            const signData = canvas.canvas.ref.current.toDataURL();
            const emptyDataSize = canvas.canvas.refHidden.current.toDataURL().length;
            if (signData.length <= emptyDataSize) {
                return this.props.showWarningAlert('Необходима подпись');
            }

            const blobBin = atob(signData.split(',')[1]);
            let array = [];
            for (let i = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i));
            }
            const file = new Blob([new Uint8Array(array)], { type: 'image/png' });

            this.handleCreateReport(val.value, file);
        };

        const onChangeValue = e => {
            if (val.value <= 0) {
                cons.innerText = null
                return;
            };
            if (!this.state.place.meter || !this.state.place.meter.lastData) {
                cons.innerText = null;
                return;
            };
            const consumption = val.value - Number(this.state.place.meter.lastData.value);
            cons.innerText = consumption;
        }

        return (
            <div className="container">
                <NavBar {...this.props}>
                    <Link className="nav-link" to={`/inspector/places/${place.id}/update`}>Изменить</Link>
                </NavBar>
                <h3 className="text-center mb-2">Место установки счетчика</h3>
                <div className="table-responsive">
                    <table className="table table-hover table-sm border-bottom">
                        <tbody>
                            <tr>
                                <td><span className="font-weight-bold">Id</span></td>
                                <td><span className="font-weight-bold">{place.id}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Название</span></td>
                                <td><span className="font-weight-bold">{place.name}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потребитель</span></td>
                                <td><span className="font-weight-bold">{place.consumer ? place.consumer.name : '---'}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Счетчик</span></td>
                                <td><span className="font-weight-bold">{place.meter ? place.meter.number : '---'}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Подпись</span></td>
                                <td><span className="font-weight-bold">{place.isSignNeed ? 'Да' : 'Нет'}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2"><span className="font-weight-bold">Последние показания:</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Дата</span></td>
                                <td><span className="font-weight-bold">{place.meter && place.meter.lastData ? prettyDate(place.meter.lastData.date) : '---'}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Показание</span></td>
                                <td><span className="font-weight-bold">{place.meter && place.meter.lastData ? place.meter.lastData.value : '---'}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <div className="form-group my-0 p-0">
                                        <input className="form-control" type="number" placeholder="Текущие показания" required ref={r => val = r} onChange={onChangeValue} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потребление: </span></td>
                                <td><span className="font-weight-bold text-right" ref={r => cons = r}></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">Фотография показаний</label>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        {
                            place.isSignNeed &&
                            <div className="my-2">
                                <CanvasSign ref={r => canvas = r} />
                            </div>
                        }
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" onClick={onClickCreateReport}>Создать</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default InspectorPlaceAddData;