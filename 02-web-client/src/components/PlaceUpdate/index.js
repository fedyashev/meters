import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import ProgressBar from '../ProgressBar';

class PlaceUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            consumers: [],
            meters: [],
            place: {
                id: props.match.params.place_id
            },
            isLoaded: false,
            isProcess: false
        }
    }

    componentDidMount() {
        Promise.resolve()
            .then(
                async () => {
                    const token = this.state.user.token;
                    const place_id = this.state.place.id;
                    const meters = await api.getAllMetersNotInPlace(token);
                    const consumers = await api.getAllConsumers(token);
                    const place = await api.getPlaceById(token, place_id);
                    this.setState({
                        ...this.state,
                        isLoaded: true,
                        meters: place.meter ? [...meters, place.meter] : meters,
                        consumers: consumers || [],
                        place
                    });
                },
                ({ error }) => {
                    this.setState({ ...this.state, isLoaded: true }, () => {
                        this.props.showWarningAlert(error.message);
                    });
                }
            )
    }

    handleUpdatePlace = (name, isSignNeed, consumer_id, meter_id) => {
        if (!name) {
            return this.props.showWarningAlert('Некорректное название места');
        }

        this.setState({...this.state, isProcess: true});

        const token = this.state.user.token;
        const place_id = this.state.place.id;
        api.updatePlaceById(token, place_id, name, isSignNeed, consumer_id, meter_id)
            .then(place => {
                if (place) {
                    this.setState({...this.state, isProcess: false}, () => {
                        this.props.showSuccessAlert('Место сохранено');
                        this.props.history.goBack();
                    });
                }
                else {
                    this.setState({...this.state, isProcess: false}, () => {
                        this.props.showWarningAlert('Место не сохранено');
                    });
                }
            })
            .catch(({ error }) => {
                this.setState({...this.state, isProcess: false}, () => {
                    this.props.showWarningAlert(error.message);
                });
            });
    }

    render() {
        let name, isSignNeed, consumer_id, meter_id;
        const { place } = this.state;
        const onClickUpdate = e => {
            e.preventDefault();
            this.handleUpdatePlace(name.value, isSignNeed.checked, consumer_id.value, meter_id.value);
        }
        if (this.state.isLoaded) {
            return (
                <div className="container">
                    <NavBar {...this.props} />
                    <div className="row justify-content-center mt-3">
                        <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                            <div className="text-center font-weight-bold mb-5">
                                <h3>Добавить место установки счетчика</h3>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Название места" required autoFocus defaultValue={place.name} ref={r => name = r} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cmbMeters">Счетчики</label>
                                    <select className="form-control" id="cmbMeters" ref={r => meter_id = r} defaultValue={place.meter ? place.meter.id : null}>
                                        <option></option>
                                        {
                                            this.state.meters.map(meter => <option key={`${meter.id}`} value={`${meter.id}`}>{`${meter.number}`}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cmbConsumers">Потребители</label>
                                    <select className="form-control" id="cmbConsumers" ref={r => consumer_id = r} defaultValue={place.consumer ? place.consumer.id : null}>
                                        <option></option>
                                        {
                                            this.state.consumers.map(consumer => <option key={`${consumer.id}`} value={`${consumer.id}`}>{`${consumer.name}`}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="cbIsSignNeed" required ref={r => isSignNeed = r} defaultChecked={place.isSignNeed} />
                                    <label className="form-check-label" htmlFor="cbIsSignNeed">Подпись?</label>
                                </div>
                                <div className="form-group">
                                {
                                    this.state.isProcess ?
                                    <ProgressBar message="Изменение..." large={true}/> :
                                    <button className="btn btn-primary btn-block" onClick={onClickUpdate}>Сохранить</button>
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
};

export default PlaceUpdate;