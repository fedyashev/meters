import React, { Component } from 'react';
import api from '../../lib/api';
import { prettyDate } from '../../lib/helpers';
import NavBar from '../NavBar';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';

class InspectorReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspector: props.inspector,
      reports: [],
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
      const result = await api.getCountReports(token, inspector_id);
      if (result && result.count > 0) {
        const offset = (pageNumber - 1) * limit;
        const reports = await api.getAllReportsByInspectorId(token, inspector_id, limit, offset);
        this.setState({ ...this.state, reports, totalItemsCount: result.count, activePage: pageNumber, isLoaded: true })
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

  downloadPdf = report_id => e => {
    e.preventDefault();
    const token = this.state.user.token;
    api.getReportByIdPdf(token, report_id)
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    if (!this.state.isLoaded) return null;
    return (
      <div className="container justify-content-center">
        <NavBar {...this.props} />
        <Table reports={this.state.reports} downloadPdf={this.downloadPdf}/>
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
  const { reports } = props;
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
            reports && reports.map(report => <TableRow key={`${report.id}`} report={report} downloadPdf={props.downloadPdf}/>)
          }
        </tbody>
      </table>
    </div>
  );
};

const TableRow = props => {
  const { report } = props;
  return (
    <tr>
      <td className="text-center">
        <Link to={`/inspector/reports/${report.id}`}>{report.id}</Link>
      </td>
      <td className="text-center">{prettyDate(report.date)}</td>
      <td className="text-center">{report.inspector.name}</td>
      <td className="text-center">{report.place.name}</td>
      <td className="text-center">{report.consumer.name}</td>
      <td className="text-center">{report.meter.number}</td>
      <td className="text-center">{report.current_data.value}</td>
      <td className="text-center"><a className="text-secondary" onClick={props.downloadPdf(report.id)} href={`api/v1/reports/${report.id}/pdf`} download={`report-${Date.now()}.pdf`}><i className="fas fa-download"></i></a></td>
    </tr>
  );
};

export default InspectorReportList;