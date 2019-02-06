import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

import NavBar from '../NavBar';
import ProgressBar from '../ProgressBar';

class ConsumerInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            consumer: {
                id: props.match.params.consumer_id
            },
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const consumer_id = this.state.consumer.id;
        api.getConsumerById(token, consumer_id)
            .then(consumer => {
                if (consumer) {
                    this.setState({ ...this.state, consumer, isLoaded: true });
                }
                else {
                    this.setState({...this.state, isLoaded: true}, () => {
                        this.props.showWarningAlert('Потребитель не найден');
                        this.props.history.goBack();
                    });
                }
            })
            .catch(({ error }) => {
                this.setState({...this.state, isLoaded: true}, () => {
                    this.props.showWarningAlert(error.message);
                    this.props.history.goBack();
                });
            });
    }

    render() {
        if (!this.state.isLoaded) return <ProgressBar/>
        const { consumer } = this.state;
        return (
            <div className="container">
                <NavBar {...this.props}>
                    <Link className="nav-link" to={`/owner/consumers/${consumer.id}/update`}>Изменить</Link>
                    <Link className="nav-link" to={`/owner/consumers/${consumer.id}/delete`}>Удалить</Link>
                </NavBar>
                <h3 className="text-center mb-2">Потребитель</h3>
                <div className="table-responsive">
                    <table className="table table-hover table-sm border-bottom">
                        <tbody>
                            <tr>
                                <td><span className="font-weight-bold">Id</span></td>
                                <td><span className="font-weight-bold">{consumer.id}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Логин</span></td>
                                <td><span className="font-weight-bold">{consumer.login}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потребитель</span></td>
                                <td><span className="font-weight-bold">{consumer.name}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Email</span></td>
                                <td><span className="font-weight-bold">{consumer.email}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Телефон</span></td>
                                <td><a className="font-weight-bold" href={`tel:${consumer.phone}`}>{consumer.phone}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default ConsumerInfo;