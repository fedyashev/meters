import React, {Component} from 'react';
import api from '../../lib/api';
import {Link} from 'react-router-dom';
import NavBar from '../NavBar';

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
                <div className="border-top border-bottom">
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
                        <span className="font-weight-bold">Счетчик</span> : <span>{place.meter ? place.meter.number : '---'}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Дата</span> : <span>{place.meter && place.meter.lastData ? place.meter.lastData.date : '---'}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Показание</span> : <span>{place.meter && place.meter.lastData ? place.meter.lastData.value : '---'}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Подпись</span> : <span>{place.isSignNeed ? 'Да' : 'Нет'}</span>
                    </div>
                </div>
            </div>
            );
        }
        return null;
    }
};

export default PlaceInfo;