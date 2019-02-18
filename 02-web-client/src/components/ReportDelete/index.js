import React, { Component } from 'react';
import api from '../../lib/api';

class ReportDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            act: {
                id: props.match.params.id
            },
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const id = this.state.act.id;
        //api.getReportById(token, report_id)
        api.act_01.getById(token, id)
            .then(act => {
                if (act) {
                    this.setState({ ...this.state, act, isLoaded: true });
                }
                else {
                    this.setState({ ...this.state, isLoaded: false }, () => {
                        this.props.showWarningAlert('Отчет не найден');
                        this.props.history.goBack();
                    });
                }
            })
            .catch(({ error }) => {
                this.setState({ ...this.state, isLoaded: false }, () => {
                    this.props.showWarningAlert(error.message);
                    this.props.history.goBack();
                });
            });
    }

    handleClickYes = e => {
        e.preventDefault();
        const token = this.state.user.token;
        const id = this.state.act.id;
        api.act_01.deletetById(token, id)
            .then(result => {
                if (result && result.done) {
                    this.props.showSuccessAlert('Отчет удален');
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
        const { act: { id } } = this.state;
        if (this.state.isLoaded) {
            return (
                <div className="container pt-2">
                    <div className="border p-5">
                        <div className="mb-5">
                            <p className="h3 text-center">{`Удалить отчет № ${id}?`}</p>
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

export default ReportDelete;