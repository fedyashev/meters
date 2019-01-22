import React, { Component } from 'react';
import api from '../../lib/api';
import GoBackLink from '../GoBackLink';

class ConsumerUpdate extends Component {
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
                    this.setState({ ...this.state, consumer });
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

    handleUpdateConsumer = (name, email) => {
        if (!name || !email) {
            return this.props.showWarningAlert('Некорректные данные в форме');
        }
        const token = this.state.user.token;
        const consumer_id = this.state.consumer.id;
        api.updateConsumerById(token, consumer_id, name, email)
            .then(consumer => {
                if (consumer) {
                    this.props.showSuccessAlert('Потребитель успешно изменен');
                    this.props.history.goBack();
                }
                else {
                    this.props.showWarningAlert('Неудалось изменить потребителя')
                }
            })
            .catch(err => {
                console.log(err);
                this.props.showWarningAlert(err.error.message);
            });
    }

    render() {
        const { consumer } = this.state;
        let name, email;
        const onClickUpdateConsumer = e => {
            e.preventDefault();
            this.handleUpdateConsumer(name.value, email.value);
        }
        return (
            <div className="container">
                <NavBar {...this.props}/>
                <div className="row justify-content-center mt-3">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="text-center font-weight-bold mb-5">
                            <h3>Редактировать потребителя</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Название потребителя" required autoFocus defaultValue={consumer.name} ref={r => name = r} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" placeholder="Email" required defaultValue={consumer.email} ref={r => email = r} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={onClickUpdateConsumer}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

const NavBar = props => {
    return (
        <nav className="nav my-2">
            <GoBackLink {...props} />
        </nav>
    );
}

export default ConsumerUpdate;