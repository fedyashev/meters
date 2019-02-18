import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import { prettyDate } from '../../lib/helpers';
import { Link } from 'react-router-dom';

class OwnerReportInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            act: {
                id: props.match.params.id
            },
            isLoaded: false
        };
    }

    componentDidMount() {
        const token = this.state.user.token;
        const id = this.state.act.id;
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
                    this.props.showWarningAlert('Отчет не найден');
                    this.props.history.goBack();
                });
            });
    }

    downloadPdf = id => e => {
        e.preventDefault();
        const token = this.state.user.token;
        api.act_01.getPdfById(token, id)
            .catch(({ error }) => {
                this.props.setAlert('warning', error.message);
            });
    };

    render() {
        if (!this.state.isLoaded) return null;
        const { user, act } = this.state;
        return (
            <div className="container">
                <NavBar {...this.props} user={user}>
                    <Link className="nav-link" to={`/owner/reports/${act.id}/update`}>Изменить</Link>
                    <Link className="nav-link" to={`/owner/reports/${act.id}/delete`}>Удалить</Link>
                    <Link className="nav-link" to="" onClick={this.downloadPdf(act.id)}>Скачать</Link>
                </NavBar>
                <h3 className="text-center mb-2">{`Отчет № ${act.id}`}</h3>
                <div className="table-responsive">
                    <table className="table table-hover table-sm border-bottom">
                        <tbody>
                            <tr>
                                <td><span className="font-weight-bold">Id</span></td>
                                <td><span className="font-weight-bold">{act.id}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Дата</span></td>
                                <td><span className="font-weight-bold">{prettyDate(act.date)}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Инспектор</span></td>
                                <td><span className="font-weight-bold">{act.inspector}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потребитель</span></td>
                                <td><span className="font-weight-bold">{act.consumer}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Место</span></td>
                                <td><span className="font-weight-bold">{act.place}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Счетчик</span></td>
                                <td><span className="font-weight-bold">{act.meter}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Подпись</span></td>
                                <td><span className="font-weight-bold">{act.ConsumerSignId ? 'Да' : 'Нет'}</span></td>
                            </tr>
                            <tr className="table-success">
                                <td colSpan="2"><span className="font-weight-bold">Предыдущие показания:</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Дата</span></td>
                                <td><span className="font-weight-bold">{act.last_date !== null ? prettyDate(act.last_date) : '---'}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Показание</span></td>
                                <td><span className="font-weight-bold">{act.last_value !== null ? act.last_value : '---'}</span></td>
                            </tr>
                            <tr className="table-danger">
                                <td colSpan="2"><span className="font-weight-bold">Текущие показания:</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Дата</span></td>
                                <td><span className="font-weight-bold">{act.current_date !== null ? prettyDate(act.current_date) : '---'}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Показание</span></td>
                                <td><span className="font-weight-bold">{act.current_value !== null ? act.current_value : '---'}</span></td>
                            </tr>
                            <tr className="table-info">
                                <td><span className="font-weight-bold">ИТОГО потребление</span></td>
                                <td>
                                    <span className="font-weight-bold">
                                        {
                                            act.current_value !== null && act.last_value !== null ? act.current_value - act.last_value : (
                                                act.current_value !== null ? act.current_value : null
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