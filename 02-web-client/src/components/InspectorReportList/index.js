import React, { Component } from 'react';
import api from '../../lib/api';
import { prettyDate, formatDate } from '../../lib/helpers';
import NavBar from '../NavBar';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';

class InspectorReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspector: props.inspector,
      acts: [],
      limit: 30,
      activePage: 1,
      totalItemsCount: 0,
      isLoaded: false
    };
  }

  loadItems = pageNumber => async () => {
    try {
      const { user: { token }, limit } = this.state;
      const inspector_id = this.state.inspector.id;
      //const result = await api.getCountReports(token, inspector_id);
      const result = await api.act_01.count(token, inspector_id);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        //const reports = await api.getAllReportsByInspectorId(token, inspector_id, limit, offset);
        const acts = await api.act_01.getAllByInspectorId(token, inspector_id, limit, offset);
        this.setState({ ...this.state, acts, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
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

  downloadPdf = act_id => e => {
    e.preventDefault();
    const token = this.state.user.token;
    api.act_01.getPdfById(token, act_id)
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    if (!this.state.isLoaded) return null;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props} />
        <Table items={this.state.acts} downloadPdf={this.downloadPdf}/>
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
  const { items } = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-sm table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">Дата</th>
            <th scope="col" className="text-center">Инспектор</th>
            <th scope="col" className="text-center">Место</th>
            <th scope="col" className="text-center">Потребитель</th>
            <th scope="col" className="text-center">Счетчик</th>
            <th scope="col" className="text-center">Показание</th>
            <th scope="col" className="text-center"><i className="fas fa-download"></i></th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '0.85rem' }}>
          {
            items && items.map(item => <TableRow key={`${item.id}`} item={item} downloadPdf={props.downloadPdf}/>)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const { item } = props;
  return (
    <tr>
      <td className="text-center">
        <Link to={`/inspector/reports/${item.id}`}>{item.id}</Link>
      </td>
      {/* <td className="text-center">{prettyDate(item.date)}</td> */}
      <td className="text-center">{prettyDate(formatDate(item.date))}</td>
      <td className="text-center">{item.inspector}</td>
      <td className="text-center">{item.place}</td>
      <td className="text-center">{item.consumer}</td>
      <td className="text-center">{item.meter}</td>
      <td className="text-center">{item.current_value}</td>
      <td className="text-center"><a className="text-secondary" onClick={props.downloadPdf(item.id)} href={`api/v1/doc/act_01/${item.id}/pdf`} download={`act-${Date.now()}.pdf`}><i className="fas fa-download"></i></a></td>
    </tr>
  );
};

export default InspectorReportList;