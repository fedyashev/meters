import React, {Component} from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import {prettyDate} from '../../lib/helpers';
import {Link} from 'react-router-dom';

class OwnerReportInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            report: {
                id: props.match.params.report_id
            },
            isLoaded: false
        };
    }

    componentDidMount() {
        const token = this.state.user.token;
        const report_id = this.state.report.id;
        api.getReportById(token, report_id)
            .then(report => {
                if (report) {
                    this.setState({...this.state, report, isLoaded: true});
                }
                else {
                    this.props.showWarningAlert('Отчет не найден');
                    this.props.history.goBack();
                }
            })
            .catch(({error}) => {
                this.props.showWarningAlert('Отчет не найден');
                this.props.history.goBack();
            });
    }

    downloadPdf = report_id => e => {
        e.preventDefault();
        const token = this.state.user.token;
        api.getReportByIdPdf(token, report_id)
            .catch(({ error }) => {
                this.props.setAlert('warning', error.message);
            });
    };

    render() {
        if (!this.state.isLoaded) return null;
        const {user, report} = this.state;
        return (
                <div className="container">
                    <NavBar {...this.props} user={user}>
                        <Link className="nav-link" to={`/owner/reports/${report.id}/update`}>Изменить</Link>
                        <Link className="nav-link" to={`/owner/reports/${report.id}/delete`}>Удалить</Link>
                        <Link className="nav-link" to="" onClick={this.downloadPdf(report.id)}>Скачать</Link>
                    </NavBar>
                    <h3 className="text-center mb-2">{`Отчет № ${report.id}`}</h3>
                    <div className="table-responsive">
                        <table className="table table-hover table-sm border-bottom">
                            <tbody>
                                <tr>
                                    <td><span className="font-weight-bold">Id</span></td>
                                    <td><span className="font-weight-bold">{report.id}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Дата</span></td>
                                    <td><span className="font-weight-bold">{prettyDate(report.date)}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Инспектор</span></td>
                                    <td><span className="font-weight-bold">{report.inspector.name}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Потребитель</span></td>
                                    <td><span className="font-weight-bold">{report.consumer.name}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Место</span></td>
                                    <td><span className="font-weight-bold">{report.place.name}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Счетчик</span></td>
                                    <td><span className="font-weight-bold">{report.meter.number}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Подпись</span></td>
                                    <td><span className="font-weight-bold">{report.sign ? 'Да' : 'Нет'}</span></td>
                                </tr>
                                <tr className="table-success">
                                    <td colSpan="2"><span className="font-weight-bold">Предыдущие показания:</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Дата</span></td>
                                    <td><span className="font-weight-bold">{report.last_data ? prettyDate(report.last_data.date) : '---'}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Показание</span></td>
                                    <td><span className="font-weight-bold">{report.last_data ? report.last_data.value : '---'}</span></td>
                                </tr>
                                <tr className="table-danger">
                                    <td colSpan="2"><span className="font-weight-bold">Текущие показания:</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Дата</span></td>
                                    <td><span className="font-weight-bold">{report.current_data ? prettyDate(report.current_data.date) : '---'}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-weight-bold">Показание</span></td>
                                    <td><span className="font-weight-bold">{report.current_data ? report.current_data.value : '---'}</span></td>
                                </tr>
                                <tr className="table-info">
                                    <td><span className="font-weight-bold">ИТОГО потребление</span></td>
                                    <td>
                                        <span className="font-weight-bold">
                                            {
                                                report.current_data && report.last_data ? report.current_data.value - report.last_data.value : (
                                                    report.current_data ? report.current_data.value : null
                                                )
                                            }
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
};

export default OwnerReportInfo;