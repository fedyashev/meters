import React, { Component } from 'react';
import api from '../../lib/api';

class ReportDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            report: {
                id: props.match.params.report_id
            },
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const report_id = this.state.report.id;
        api.getReportById(token, report_id)
            .then(report => {
                if (report) {
                    this.setState({ ...this.state, report, isLoaded: true });
                }
                else {
                    this.props.showWarningAlert('Отчет не найден');
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
        const report_id = this.state.report.id;
        api.deleteReportById(token, report_id)
            .then(done => {
                if (done) {
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
        const { report : {id} } = this.state;
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