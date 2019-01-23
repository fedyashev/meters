import React, { Component } from 'react';
import api from '../../lib/api';

class PlaceDelete extends Component {
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
            .then(place => {
                if (place) {
                    this.setState({ ...this.state, place, isLoaded: true });
                }
                else {
                    this.props.showWarningAlert('Место не найдено');
                    this.props.history.goBack();
                }
            })
            .catch(({ error }) => {
                this.props.showWarningAlert(error.message);
                this.props.history.goBack();
            });
    }

    handleClickYes = e => {
        e.preventDefault();
        const token = this.state.user.token;
        const place_id = this.state.place.id;
        api.deletePlaceById(token, place_id)
            .then(done => {
                if (done) {
                    this.props.showSuccessAlert('Место удалено');
                    this.props.history.go(-2);
                }
            })
            .catch(({ error }) => {
                this.props.showWarningAlert(error.message);
            });
    }

    handleClickNo = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const { place } = this.state;
        if (this.state.isLoaded) {
            return (
                <div className="container pt-2">
                    <div className="border p-5">
                        <div className="mb-5">
                            <p className="h3 text-center">{`Удалить место ${place.name}?`}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="ml-5">
                                <button className="btn btn-success" onClick={this.handleClickYes}>Yes</button>
                            </div>
                            <div className="mr-5">
                                <button className="btn btn-danger" onClick={this.handleClickNo}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
};

export default PlaceDelete;