import React, { Component } from 'react';
import api from '../../lib/api';
import { parseDate } from '../../lib/helpers';
import NavBar from '../NavBar';

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      reports: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    api.getAllReports(this.props.user.token)
      .then(reports => {
        if (reports) {
          this.setState({ ...this.state, reports, isLoaded: true });
        }
      })
      .catch(({ error }) => {
        this.setState({ ...this.state, isLoaded: true }, () => {
          this.props.setAlert('warning', error.message);
        });
      });
  };

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
            <th scope="col" className="text-center">PDF</th>
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
      <td className="text-center">{report.id}</td>
      <td className="text-center">{parseDate(report.date)}</td>
      <td className="text-center">{report.inspector.name}</td>
      <td className="text-center">{report.place.name}</td>
      <td className="text-center">{report.consumer.name}</td>
      <td className="text-center">{report.meter.number}</td>
      <td className="text-center">{report.current_data.value}</td>
      <td className="text-center"><a onClick={props.downloadPdf(report.id)} href={`api/v1/reports/${report.id}/pdf`} download={`report-${Date.now()}.pdf`}>PDF</a></td>
    </tr>
  );
};

export default ReportList;