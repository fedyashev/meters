import React, { Component } from 'react';
import api from '../../lib/api';
import GoBackLink from '../GoBackLink';
import ProgressBar from '../ProgressBar';

class ConsumerCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            isLoaded: false
        }
    }

    handleCreateConsumer = (login, password, name, email, phone) => {
        const token = this.state.user.token;
        this.setState({ ...this.state, isLoaded: false });
        api.createConsumer(token, login, password, name, email, phone)
            .then(consumer => {
                if (consumer) {
                    this.setState({ ...this.state, isLoaded: true }, () => {
                        this.props.showSuccessAlert('Потребитель добавлен');
                        this.props.history.goBack();
                    });
                }
                else {
                    this.props.showWarningAlert('Потребитель не добавлен');
                    this.setState({ ...this.state, isLoaded: true });
                }
            })
            .catch(({ error }) => {
                this.props.showWarningAlert(error.message);
                this.setState({ ...this.state, isLoaded: true });
            });
    }

    componentDidMount() {
        this.setState({ ...this.state, isLoaded: true });
    }

    render() {
        let login, password, confirmPassword, name, email, phone;

        const onClickCreateConsumer = e => {
            e.preventDefault();
            if (!login || !password || !confirmPassword || !name || !email) {
                return this.showWarningAlert('Некорректрые данные в форме');
            }
            if (password.value === confirmPassword.value) {
                this.handleCreateConsumer(login.value, password.value, name.value, email.value, phone.value);
            }
            else {
                this.props.showWarningAlert('Пароли не совпадают');
            }
        };

        return (
            <div>
                {
                    !this.state.isLoaded && <ProgressBar />
                }
                <div className="container">
                    <NavBar {...this.props} />
                    <div className="row justify-content-center mt-3">
                        <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                            <div className="text-center font-weight-bold mb-5">
                                <h3>Добавить потребителя</h3>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Логин" required autoFocus ref={r => login = r} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="password" placeholder="Пароль" required ref={r => password = r} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="password" placeholder="Подтвердить пароль" required ref={r => confirmPassword = r} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Название потребителя" required ref={r => name = r} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="email" placeholder="Email" required ref={r => email = r} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="email" placeholder="Номер телефона" required ref={r => phone = r} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" onClick={onClickCreateConsumer}>Создать</button>
                                </div>
                            </form>
                        </div>
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

export default ConsumerCreate;