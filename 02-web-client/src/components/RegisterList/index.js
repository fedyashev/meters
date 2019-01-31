import React, { Component } from 'react';
//import api from '../../lib/api';
import NavBar from '../NavBar';
import ProgressBar from '../ProgressBar';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

class RegisterList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            registers: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        api.getAllRegisters(token)
            .then(registers => {
                if (registers) {
                    this.setState({...this.state, registers, isLoaded: true});
                }
                else {
                    this.setState({...this.state, isLoaded: true}, () => {
                        this.props.showWarningAlert('Реестры не найдены');
                    });
                }
            })
            .catch(({error}) => {
                this.setState({...this.state, isLoaded: true}, () => {
                    this.props.showWarningAlert(error.message);
                })
            });
    }

    render() {
        if (!this.state.isLoaded) return <ProgressBar />
        return (
            <div className="container justify-content-center">
                <NavBar {...this.props}>
                    <Link className="nav-link" to='/owner/registers/create'>Добавить</Link>
                </NavBar>
                <Table registers={this.state.registers} />
            </div>
        );
    }
};

const Table = props => {
    const { registers } = props;
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="text-center">Id</th>
                        <th scope="col" className="text-center">Название</th>
                        <th scope="col" className="text-center">Групповой абонент</th>
                        <th scope="col" className="text-center"><i className="fas fa-file-excel"></i></th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '0.85rem' }}>
                    {
                        registers && registers.map(register => <TableRow key={`${register.id}`} register={register} />)
                    }
                </tbody>
            </table>
        </div>
    );
};

const TableRow = props => {
    const { register } = props;
    return (
        <tr>
            <td className="text-center"><Link to={`/owner/registers/${register.id}`}>{register.id}</Link></td>
            <td className="text-center">{register.name}</td>
            <td className="text-center">
                {
                    register.group_abonent && <Link to={`/owner/places/${register.group_abonent.id}`}>{register.group_abonent.name}</Link>
                }
            </td>
            <td className="text-center text-secondary"><i className="fas fa-file-excel"></i></td>
        </tr>
    );
};

export default RegisterList;