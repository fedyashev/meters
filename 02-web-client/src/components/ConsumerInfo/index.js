import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

import GoBackLink from '../GoBackLink';

class ConsumerInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            consumer: {
                id: props.match.params.consumer_id
            }
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const consumer_id = this.state.consumer.id;
        api.getConsumerById(token, consumer_id)
            .then(consumer => {
                if (consumer) {
                    this.setState({ ...this.state, consumer: consumer });
                }
                else {
                    this.props.showWarningAlert('Потребитель не найден');
                    this.props.history.goBack();
                }
            })
            .catch(({ error }) => {
                this.props.showWarningAlert(error.message);
                this.props.history.goBack();
            });
    }

    render() {
        const { consumer } = this.state;
        return (
            <div className="container">
                <NavBar {...this.props} consumer={this.state.consumer} />
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
                                <td><span className="font-weight-bold">{consumer.phone}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

const NavBar = props => {
    const { consumer } = props;
    return (
        <nav className="nav my-2">
            <GoBackLink {...props} />
            <Link className="nav-link" to={`/owner/consumers/${consumer.id}/update`}>Изменить</Link>
            <Link className="nav-link" to={`/owner/consumers/${consumer.id}/delete`}>Удалить</Link>
        </nav>

    );
}

export default ConsumerInfo;