import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';
import api from '../../lib/api';
import {prettyDate} from '../../lib/helpers';

class RegisterInfo extends Component {
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
                    console.log(register);
                    this.setState({...this.state, register, isLoaded: true});
                }
                else {
                    this.setState({...this.state, isLoaded: true}, () => {
                        this.props.showWarningAlert('Реестр не найден');
                    });
                }
            })
            .catch(({error}) => {
                this.setState({...this.state, isLoaded: true}, () => {
                    this.props.showWarningAlert(error.message);
                });
            });
    }

    render() {
        if (!this.state.isLoaded) return <ProgressBar/>
        return (
            <div className="container justify-content-center">
                <NavBar {...this.props}>
                    <Link className="nav-link" to={`/owner/registers/${this.state.register.id}/update`}>Изменить</Link>
                    <Link className="nav-link" to={`/owner/registers/${this.state.register.id}/delete`}>Удалить</Link>
                </NavBar>
                <h3 className="text-center">Групповой абонент</h3>
                <Table items={[this.state.register.group_abonent]}/>
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
                        <th scope="col" className="text-center">Id</th>
                        <th scope="col" className="text-center">Место</th>
                        <th scope="col" className="text-center">Потребитель</th>
                        <th scope="col" className="text-center">Счетчик</th>
                        <th scope="col" className="text-center">Дата</th>
                        <th scope="col" className="text-center">Показания</th>
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
        <tr>
            <td className="text-center">{item.id}</td>
            <td className="text-center"><Link to={`/owner/places/${item.id}`}>{item.name}</Link></td>
            <td className="text-center">
                {
                    item.consumer && <Link to={`/owner/consumers/${item.consumer.id}`}>{item.consumer.name}</Link>
                }
            </td>
            <td className="text-center">
                {
                    item.meter && <Link to={`/owner/meters/${item.meter.id}`}>{item.meter.number}</Link>
                }
            </td>
            <td className="text-center">{item.meter && item.meter.last_data ? prettyDate(item.meter.last_data.date) : null}</td>
            <td className="text-center">{item.meter && item.meter.last_data ? item.meter.last_data.value : null}</td>
        </tr>
    );
};

export default RegisterInfo;