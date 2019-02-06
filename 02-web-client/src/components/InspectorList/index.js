import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../lib/api';
import NavBar from '../NavBar';
import ProgressBar from '../ProgressBar';
import Pagination from 'react-js-pagination';

class InspectorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspectors: [],
      limit: 30,
      activePage: 1,
      totalItemsCount: 0,
      isLoaded: false
    };
  }

  loadItems = pageNumber => async () => {
    try {
      const { user: { token }, limit } = this.state;
      const result = await api.getCountInspectors(token);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        const inspectors = await api.getAllInspectors(token, limit, offset);
        this.setState({ ...this.state, inspectors, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
      }
      else {
        this.setState({ ...this.state, isLoaded: true });
      }
    }
    catch ({ error }) {
      this.setState({...this.state, isLoaded: true}, () => {
        this.props.showWarningAlert(error.message);
      });
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
          <Link className="nav-link" to='/owner/inspectors/create'>Добавить</Link>
        </NavBar>
        <Table inspectors={this.state.inspectors}/>
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
  const {inspectors} = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">Login</th>
            <th scope="col" className="text-center">Name</th>
          </tr>
        </thead>
        <tbody style={{fontSize: '0.85rem'}}>
          {
            inspectors && inspectors.map(inspector => <TableRow key={`${inspector.id}-${inspector.name}`} inspector={inspector}/>)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const {inspector} = props;
  return (
    <tr>
      <td className="text-center">
      <Link to={`/owner/inspectors/${inspector.id}`}>{inspector.id}</Link>
      </td>
      <td className="text-center">{inspector.login}</td>
      <td className="text-center">{inspector.name}</td>
    </tr>
  );
}

export default InspectorList;