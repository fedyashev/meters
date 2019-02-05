import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';

class ReportUpdate extends Component {
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

    handleUpdateReport = value => {
        const {report} = this.state;
        if (Number.isNaN(value) || value < 0) {
          return this.props.showWarningAlert('Некорректное значение показания счетчика');
        }
        if (report.last_data && (value < Number(report.last_data.value))) {
          return this.props.showWarningAlert('Некорректное значение показания счетчика');
        }
        const token = this.state.user.token;
        const report_id = this.state.report.id;
        api.updateReportById(token, report_id, value)
            .then(result => {

                if (!result || !result.done) {
                    this.props.showWarningAlert('Неудалось изменить отчет');
                  }
                  else {
                    api.sendReport(token, report_id)
                      .then(done => {
                        this.props.showSuccessAlert('Отчет изменен и отправлен.');
                        this.props.history.goBack();
                      })
                      .catch(({ error }) => {
                        this.props.showWarningAlert("Отчет изменен, но не отправлен. \n" + error.message);
                        this.props.history.goBack();
                      });
                  }
            })
            .catch(({ error }) => {
                this.props.showWarningAlert('Показания не изменены');
            });
    }

    render() {
        if (!this.state.isLoaded) return null;
        const { report } = this.state;
        let val;
        const onClickSave = e => {
            e.preventDefault();
            this.handleUpdateReport(val.value);
        };
        return (
            <div className="container">
                <NavBar {...this.props} />
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="text-center font-weight-bold mb-5">
                            <h3>Изменить показания</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <input className="form-control" type="number" placeholder="Показания счетчика" required ref={r => val = r} defaultValue={report.current_data.value} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={onClickSave}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default ReportUpdate;