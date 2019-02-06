import React, { Component } from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';
import ProgressBar from '../ProgressBar';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

class MeterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      meters: [],
      limit: 30,
      activePage: 1,
      totalItemsCount: 0,
      isLoaded: false
    };
  }

  loadItems = pageNumber => async () => {
    try {
      const { user: { token }, limit } = this.state;
      const result = await api.getCountMeters(token);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        const meters = await api.getAllMeters(token, limit, offset);
        this.setState({ ...this.state, meters, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
      }
      else {
        this.setState({ ...this.state, isLoaded: true });
      }
    }
    catch ({ error }) {
      this.props.showWarningAlert(error.message);
    }
  };

  componentDidMount() {
    Promise.resolve()
      .then(this.loadItems(this.state.activePage))
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  };

  handlerChangePage = pageNumber => {
    Promise.resolve()
      .then(this.loadItems(pageNumber))
      .catch(({ error }) => {
        this.props.showWarningAlert(error.message);
      });
  }

  render() {
    if (!this.state.isLoaded) return <ProgressBar />;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props}>
          <Link className="nav-link" to="/owner/meters/create">Добавить</Link>
        </NavBar>
        <Table meters={this.state.meters} />
        {
          this.state.totalItemsCount > this.state.limit ?
            <Pagination
              hideDisabled
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.limit}
              totalItemsCount={this.state.totalItemsCount}
              innerClass="pagination justify-content-center"
              itemClass="page-item"
              linkClass="page-link"
              onChange={this.handlerChangePage}
            /> : null
        }
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