import React, {Component} from 'react';
import api from '../../lib/api';
import {Link} from 'react-router-dom';
import NavBar from '../NavBar';
import {prettyDate} from '../../lib/helpers';

class PlaceInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
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

    render() {
        const {place} = this.state;
        if (this.state.isLoaded) {
            return (
            <div className="container">
                <NavBar {...this.props}>
                    <Link className="nav-link" to={`/owner/places/${place.id}/update`}>Изменить</Link>
                    <Link className="nav-link" to={`/owner/places/${place.id}/delete`}>Удалить</Link>
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
                        </tbody>
                    </table>
                </div>
            </div>
            );
        }
        return null;
    }
};

export default PlaceInfo;