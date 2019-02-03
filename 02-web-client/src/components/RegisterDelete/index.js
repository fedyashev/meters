import React, { Component } from 'react';
import api from '../../lib/api';
import ProgressBar from '../ProgressBar';

class RegisterDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            register: {
                id: props.match.params.register_id
            },
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const register_id = this.state.register.id;
        api.getRegisterById(token, register_id)
            .then(register => {
                if (register) {
                    this.setState({ ...this.state, register, isLoaded: true });
                }
                else {
                    this.props.showWarningAlert('Реестр не найден');
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
        const register_id = this.state.register.id;
        api.deleteRegisterById(token, register_id)
            .then(result => {
                if (result && result.done) {
                    this.props.showSuccessAlert('Реестр удален');
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
        if (!this.state.isLoaded) return <ProgressBar/>;
        const { register } = this.state;
        return (
            <div className="container pt-2">
                <div className="border p-5">
                    <div className="mb-5">
                        <p className="h3 text-center">{`Удалить реестр ${register.name}?`}</p>
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
};

export default RegisterDelete;