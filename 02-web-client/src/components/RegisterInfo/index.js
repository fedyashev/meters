import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';
import api from '../../lib/api';
import { prettyDate } from '../../lib/helpers';

class RegisterInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            register: {
                id: props.match.params.register_id
            },
            consumptionGroup: 0,
            consumptionSubs: 0,
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const register_id = this.state.register.id;
        api.getRegisterById(token, register_id)
            .then(register => {
                if (register) {
                    console.log(register);
                    const consumptionGroup = calculateConsumptionGroup(register.group_abonent);
                    const consumptionSubs = calculateConsumptionSub(register.sub_abonents);
                    this.setState({ ...this.state, consumptionGroup, consumptionSubs, register, isLoaded: true });
                }
                else {
                    this.setState({ ...this.state, isLoaded: true }, () => {
                        this.props.showWarningAlert('Реестр не найден');
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.props.showWarningAlert(err.error && err.error.message ? err.error.message : err);
                this.props.history.goBack();
            });
    }

    downloadXlsx = register_id => e => {
        e.preventDefault();
        const token = this.state.user.token;
        api.downloadXlsxRegisterById(token, register_id)
        .catch(({error}) => {
            this.props.setAlert('warning', error.message);
        });
    };

    render() {
        if (!this.state.isLoaded) return <ProgressBar />;
        const { register } = this.state;
        return (
            <div className="container justify-content-center">
                <NavBar {...this.props}>
                    <Link className="nav-link" to={`/owner/registers/${this.state.register.id}/update`}>Изменить</Link>
                    <Link className="nav-link" to={`/owner/registers/${this.state.register.id}/delete`}>Удалить</Link>
                    <Link className="nav-link" to={`api/v1/registers/${register.id}/xlsx`} onClick={this.downloadXlsx(register.id)}>Скачать</Link>
                </NavBar>
                <h3 className="text-center mb-2">Реестр</h3>
                <div className="table-responsive">
                    <table className="table table-hover table-sm border-bottom">
                        <tbody>
                            <tr>
                                <td><span className="font-weight-bold">Id</span></td>
                                <td><span className="font-weight-bold">{register.id}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Название</span></td>
                                <td><span className="font-weight-bold">{register.name}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потребление: Групповой</span></td>
                                <td><span className="font-weight-bold">{this.state.consumptionGroup}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потребление: Субабоненты</span></td>
                                <td><span className="font-weight-bold">{this.state.consumptionSubs}</span></td>
                            </tr>
                            <tr>
                                <td><span className="font-weight-bold">Потери</span></td>
                                <td><span className="font-weight-bold">{this.state.consumptionGroup - this.state.consumptionSubs}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 className="text-center">Групповой абонент</h3>
                <Table items={this.state.register.group_abonent ? [this.state.register.group_abonent] : []} />
                <h3 className="text-center">Субабоненты</h3>
                <Table items={this.state.register.sub_abonents || []} />
            </div>
        );
    }
};

const Table = props => {
    const { items } = props;
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="text-center align-middle">Id</th>
                        <th scope="col" className="text-center align-middle">Место</th>
                        <th scope="col" className="text-center align-middle">Потребитель</th>
                        <th scope="col" className="text-center align-middle">Счетчик</th>
                        <th scope="col" className="text-center align-middle">Предыдущие показания</th>
                        <th scope="col" className="text-center align-middle">Текущие показания</th>
                        <th scope="col" className="text-center align-middle">Потребление</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '0.85rem' }}>
                    {
                        items && items.map(item => <TableRow key={item.id} item={item} />)
                    }
                </tbody>
            </table>
        </div>
    );
};

const TableRow = props => {
    const { item } = props;
    if (!item) return null;
    return (
        <>
            <tr>
                <td rowSpan="2" className="text-center align-middle">{item.id}</td>
                <td rowSpan="2" className="text-center align-middle"><Link to={`/owner/places/${item.id}`}>{item.name}</Link></td>
                <td rowSpan="2" className="text-center align-middle">
                    {
                        item.consumer && <Link to={`/owner/consumers/${item.consumer.id}`}>{item.consumer.name}</Link>
                    }
                </td>
                <td rowSpan="2" className="text-center align-middle">
                    {
                        item.meter && <Link to={`/owner/meters/${item.meter.id}`}>{item.meter.number}</Link>
                    }
                </td>
                <td className="text-center align-middle">{item.meter && item.meter.data[1] ? prettyDate(item.meter.data[1].date) : null}</td>
                <td className="text-center align-middle">{item.meter && item.meter.data[0] ? prettyDate(item.meter.data[0].date) : null}</td>
                <td rowSpan="2" className="text-center align-middle">
                    {
                        (() => {
                            const last = item.meter && item.meter.data[1] ? item.meter.data[1].value : null;
                            const curr = item.meter && item.meter.data[0] ? item.meter.data[0].value : null;
                            return calculateConsumption(last, curr);
                        })()
                    }
                </td>
            </tr>
            <tr>
                <td className="text-center align-middle">{item.meter && item.meter.data[1] ? item.meter.data[1].value : null}</td>
                <td className="text-center align-middle">{item.meter && item.meter.data[0] ? item.meter.data[0].value : null}</td>
            </tr>
        </>
    );
};

const calculateConsumption = (last, curr) => {
    if (last && curr && !isNaN(last) && !isNaN(curr)) {
        return curr - last;
    }
    else if (curr && !isNaN(curr)) {
        return curr;
    }
    else {
        return null;
    }
};

const calculateConsumptionGroup = (group_abonent) => {
    if (!group_abonent) return null;
    const { meter } = group_abonent;
    const last = meter && meter.data[1] ? meter.data[1].value : null;
    const curr = meter && meter.data[0] ? meter.data[0].value : null;
    return calculateConsumption(last, curr);
};

const calculateConsumptionSub = (sub_abonents) => {
    if (!sub_abonents) return null;
    let consumption = 0;
    sub_abonents.forEach(p => {
        const { meter } = p;
        const last = meter && meter.data[1] ? meter.data[1].value : null;
        const curr = meter && meter.data[0] ? meter.data[0].value : null;
        const result = calculateConsumption(last, curr);
        if (result !== null) consumption += result;
    });
    return consumption;
};

export default RegisterInfo;