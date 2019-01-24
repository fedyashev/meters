import React, {Component} from 'react';
import api from '../../../../lib/api';
import {Link} from 'react-router-dom';
import NavBar from '../../../NavBar';

class PlaceAuditInfo extends Component {
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
                        this.setState({...this.state, place, isLoaded: true});
                    }
                    else {
                        this.props.showWarningAlert('Место не найдено');
                        this.props.history.goBack();
                    }
                },
                ({error}) => {
                    this.props.showWarningAlert(error.message);
                    this.props.history.goBack();
                }
            );
    }

    handleCreateReport = (value) => {
        const token = this.state.user.token;
        const inspector_id = this.state.inspector.id;
        const place_id = this.state.place.id;
        const date = formatDate(Date.now());
        const sign_id = null;
        api.createReport(token, inspector_id, place_id, date, value)
            .then(report => {
                if (report) {
                    this.props.showSuccessAlert('Показания добавлены. Отчет создан.');
                    this.props.history.goBack();
                }
                else {
                    this.props.showWarningAlert('Показания не добавлены.');
                }
            })
            .catch(({error}) => {
                this.props.showWarningAlert(error.message);
                //this.props.history.goBack();
            });
    };

    render() {
        if (!this.state.isLoaded) return null;
        const {place} = this.state;
        let val;
        const onClickAdd = e => {
            e.preventDefault();
            const token = this.state.user.token;
            const meter_id = this.state.place.meter.id;
            if (!val.value) {
                this.props.showWarningAlert("Не корректные показания счетчика");
                return;
            }
            const date = formatDate(Date.now());
            this.handleCreateReport(val.value);
            // console.log(meter_id, date, val.value);
            // api.createData(token, meter_id, date, val.value)
            //     .then(data => {
            //         if (data) {
            //             this.props.showSuccessAlert('Показания добавлены');
            //             this.props.history.goBack();
            //         }
            //         else {
            //             this.props.showWarningAlert('Неудалось добавить показания счетчика');
            //         }
            //     })
            //     .catch(({error}) => {
            //         this.props.showWarningAlert(error.message);
            //     });
        };
        return (
            <div className="container">
                <NavBar {...this.props}/>
                <h3 className="text-center mb-2">Место установки счетчика</h3>
                <div className="border-top border-bottom mb-5">
                    <div>
                        <span className="font-weight-bold">Id</span> : <span>{place.id}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Название</span> : <span>{place.name}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Потребитель</span> : <span>{place.consumer ? place.consumer.name : '---'}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Подпись</span> : <span>{place.isSignNeed ? 'Да' : 'Нет'}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Счетчик</span> : <span>{place.meter ? place.meter.number : '---'}</span>
                    </div>
                    <div className="border-top">
                        <div>
                            <span className="font-weight-bold">Последние показания:</span>
                        </div>
                        <div>
                            <span className="font-weight-bold">Дата</span> : <span>{place.meter && place.meter.lastData ? place.meter.lastData.date : '---'}</span>
                        </div>
                        <div>
                            <span className="font-weight-bold">Показание</span> : <span>{place.meter && place.meter.lastData ? place.meter.lastData.value : '---'}</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="text-center font-weight-bold mb-2">
                            <h3>Добавить показание счетчика</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Показание, кВт" required autoFocus ref={r => val = r}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={onClickAdd}>Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

const formatDate = date => {
    const tmp = new Date(date);
    const year = tmp.getFullYear();
    const month = tmp.getMonth() + 1;
    const day = tmp.getDate();
    const hour = tmp.getHours();
    const minutes = tmp.getMinutes();
    const seconds = tmp.getSeconds();
    const millis = tmp.getMilliseconds();
    return `${year}-${month < 9 ? `0${month}` : month}-${day} ${hour}:${minutes}:${seconds}`;
};

export default PlaceAuditInfo;