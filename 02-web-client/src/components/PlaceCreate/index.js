import React, { Component } from 'react';
import api from '../../lib/api';
import GoBackLink from '../GoBackLink';

class PlaceCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            consumers: [],
            meters: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        Promise.resolve()
            .then(
                async () => {
                    const token = this.state.user.token;
                    const meters = await api.getAllMetersNotInPlace(token);
                    const consumers = await api.getAllConsumers(token);
                    this.setState({
                        ...this.state,
                        isLoaded: true,
                        meters: meters || [],
                        consumers: consumers || []
                    });
                },
                ({ error }) => {
                    this.setState({ ...this.state, isLoaded: true }, () => {
                        this.props.showWarningAlert(error.message);
                    });
                }
            )
    }

    handleCreatePlace = (name, isSignNeed, consumer_id, meter_id) => {
        if (!name) {
            return this.props.showWarningAlert('Некорректное название места');
        }
        const token = this.state.user.token;
        api.createPlace(token, name, isSignNeed, consumer_id, meter_id)
            .then(
                place => {
                    if (place) {
                        this.props.showSuccessAlert('Место добавлено');
                        this.props.history.goBack();
                    }
                    else {
                        this.props.showWarningAlert('Не удалось добавить новое место');
                    }
                },
                ({error}) => {
                    this.props.showWarningAlert(error.message)
                }
            )
            .catch(({error}) => {
                this.props.showWarningAlert(error.message);
            });
    }

    render() {
        let name, isSignNeed, consumer_id, meter_id;
        const onClickCreate = e => {
            e.preventDefault();
            this.handleCreatePlace(name.value, isSignNeed.checked, consumer_id.value, meter_id.value);
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
                                    <input className="form-control" type="text" placeholder="Название места" required autoFocus ref={r => name = r} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cmbMeters">Счетчики</label>
                                    <select className="form-control" id="cmbMeters" ref={r => meter_id = r}>
                                        <option></option>
                                        {
                                            this.state.meters.map(meter => <option key={`${meter.id}`} value={`${meter.id}`}>{`${meter.number}`}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cmbConsumers">Потребители</label>
                                    <select className="form-control" id="cmbConsumers" ref={r => consumer_id = r}>
                                        <option></option>
                                        {
                                            this.state.consumers.map(consumer => <option key={`${consumer.id}`} value={`${consumer.id}`}>{`${consumer.name}`}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="cbIsSignNeed" required ref={r => isSignNeed = r} />
                                    <label className="form-check-label" htmlFor="cbIsSignNeed">Подпись?</label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" onClick={onClickCreate}>Добавить</button>
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

const NavBar = props => {
    return (
        <nav className="nav">
            <GoBackLink {...props} />
        </nav>
    );
};

export default PlaceCreate;