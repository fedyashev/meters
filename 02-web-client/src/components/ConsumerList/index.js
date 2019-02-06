import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../lib/api';
import NavBar from '../NavBar';
import ProgressBar from '../ProgressBar';
import Pagination from 'react-js-pagination';

class ConsumerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      consumers: [],
      limit: 30,
      activePage: 1,
      totalItemsCount: 0,
      isLoaded: false
    };
  }

  loadItems = pageNumber => async () => {
    try {
      const { user: { token }, limit } = this.state;
      const result = await api.getCountConsumers(token);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        const consumers = await api.getAllConsumers(token, limit, offset);
        this.setState({ ...this.state, consumers, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
      }
      else {
        this.setState({ ...this.state, isLoaded: true });
      }
    }
    catch ({ error }) {
      this.setState({ ...this.state, isLoaded: true });
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
    if (!this.state.isLoaded) return <ProgressBar/>;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props}>
          <Link className="nav-link" to='/owner/consumers/create'>Добавить</Link>
        </NavBar>
        <Table consumers={this.state.consumers}/>
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
  const {consumers} = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">Логин</th>
            <th scope="col" className="text-center">Потребитель</th>
            <th scope="col" className="text-center">Email</th>
            <th scope="col" className="text-center">Телефон</th>
          </tr>
        </thead>
        <tbody style={{fontSize: '0.85rem'}}>
          {
              consumers && consumers.map(consumer => <TableRow key={`${consumer.id}-${consumer.login}-${consumer.name}-${consumer.email}`} consumer={consumer}/>)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const {consumer} = props;
  return (
    <tr>
      <td className="text-center"><Link to={`/owner/consumers/${consumer.id}`}>{consumer.id}</Link></td>
      <td className="text-center">{consumer.login}</td>
      <td className="text-center">{consumer.name}</td>
      <td className="text-center">{consumer.email}</td>
      <td className="text-center"><a className="font-weight-bold" href={`tel:${consumer.phone}`}>{consumer.phone}</a></td>
    </tr>
  );
}

export default ConsumerList;