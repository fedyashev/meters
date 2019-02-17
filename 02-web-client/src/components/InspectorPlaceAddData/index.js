import React, { Component } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { prettyDate, formatDate, strBase64ToBin } from '../../lib/helpers';
import CanvasSign from '../CanvasSign';
import ProgressBar from '../ProgressBar';

class InspectorPlaceAddData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            inspector: props.inspector,
            place: {
                id: props.match.params.place_id
            },
            consumption: null,
            isLoaded: false,
            isProcess: false,
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
        //const inspector_id = this.state.inspector.id;
        const inspector = this.state.inspector.name;
        //const place_id = this.state.place.id;
        const placeName = this.state.place.name;
        const consumer = this.state.place.consumer.name;
        const meter = this.state.place.meter.number;
        const date = formatDate(Date.now());
        let sign_id = null;

        let sign = null;
        //let report = null;
        let act = null;

        this.setState({...this.state, isProcess: true});

        try {
            if (this.state.place.isSignNeed) {
                sign = await api.createSign(token, signData);
                sign_id = sign.id;
            }
            //report = await api.createReport(token, inspector_id, place_id, sign_id, date, value);
            act = await api.act_01.create(token, inspector, consumer, placeName, meter, sign_id, date, value);
        } catch ({error}) {
            if (sign) api.deleteSignById(token, sign.id).then(() => {});
            this.setState({...this.state, isProcess: false}, () => {
                this.props.showWarningAlert(error.message);
            });
            return;
        }

        if (!act) {
            this.setState({...this.state, isProcess: false}, () => {
                this.props.showWarningAlert('Неудалось создать отчет');
            });
        }
        else {
            //api.sendReport(token, report.id)
            api.act_01.sendEmailById(token, act.id)
                .then(done => {
                    this.setState({...this.state, isProcess: false}, () => {
                        this.props.showSuccessAlert('Отчет создан и отправлен.');
                        this.props.history.goBack();
                    });
                })
                .catch(({error}) => {
                    this.setState({...this.state, isProcess: false}, () => {
                        this.props.showWarningAlert("Отчет создан, но не отправлен. \n" + error.message);
                        this.props.history.goBack();
                    });
                });
        }
    };

    render() {
        let val, canvas;
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
            
            const file = strBase64ToBin(signData);
            this.handleCreateReport(val.value, file);
        };

        const onChangeValue = e => {
            let consumption = null; 
            if (val.value <= 0) {
                consumption = null;
            }
            else if (!this.state.place.meter) {
                consumption = null;
            }
            else if (this.state.place.meter && !this.state.place.meter.lastData) {
                consumption = val.value;
            }
            else {
                consumption = val.value - Number(this.state.place.meter.lastData.value);    
            }
            this.setState({...this.state, consumption: consumption});
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
                                <td><span className="font-weight-bold">Телефон</span></td>
                                <td><span className="font-weight-bold">{place.consumer && place.consumer.phone ? <a href={`tel:${place.consumer.phone}`}>{place.consumer.phone}</a> : '---'}</span></td>
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
                            <tr className={this.state.consumption === 0 ? 'table-warning' : (this.state.consumption > 0 ? 'table-success' : 'table-danger') }>
                                <td><span className="font-weight-bold">Потребление: </span></td>
                                <td><span className="font-weight-bold text-right">{this.state.consumption}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">Фотография показаний</label>
                    </div>
                </div> */}
                {
                    place.isSignNeed &&
                    <>
                        <h5 className="text-center mb-2">Подпись потребителя</h5>
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                                <div className="my-2">
                                    <CanvasSign ref={r => canvas = r} />
                                </div>
                            </div>
                        </div>
                    </>
                }
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="form-group">
                        {
                            this.state.isProcess ?
                            <ProgressBar message="Создание отчета..." large={true}/> :
                            <button className="btn btn-primary btn-block" onClick={onClickCreateReport}>Создать</button>
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default InspectorPlaceAddData;