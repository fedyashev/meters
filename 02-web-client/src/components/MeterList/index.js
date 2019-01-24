import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';

class MeterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      meters: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    api.getAllMeters(this.props.user.token)
      .then(meters => {
        if (meters) {
          this.setState({ ...this.state, meters, isLoaded: true });
        }
      })
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  };

  render() {
    if (!this.state.isLoaded) return null;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props}>
          <Link className="nav-link" to="/owner/meters/create">Добавить</Link>
        </NavBar>
        <Table meters={this.state.meters} />
      </div>
    );
  }

};

const Table = props => {
  const { meters } = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">Number</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '0.85rem' }}>
          {
            meters && meters.map(meter => <TableRow key={`${meter.id}-${meter.number}`} meter={meter} />)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const { meter } = props;
  return (
    <tr>
      <td className="text-center">
        <Link to={`/owner/meters/${meter.id}`}>{meter.id}</Link>
      </td>
      <td className="text-center">{meter.number}</td>
    </tr>
  );
};

export default MeterList;