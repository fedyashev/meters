import React, {Component} from 'react';
import api from '../../lib/api';

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      reports: []
    };
  }

  componentDidMount() {
    api.getAllReports(this.props.user.token)
      .then(reports => {
        console.log(reports);
        if (reports) {
          this.setState({...this.state, reports: reports});
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        <Table reports={this.state.reports}/>
      </div>
    );
  }

};

const Table = props => {
  const {reports} = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Date</th>
          <th scope="col" className="text-center">Inspector</th>
          <th scope="col" className="text-center">Place</th>
          <th scope="col" className="text-center">Consumer</th>
          <th scope="col" className="text-center">Meter</th>
          <th scope="col" className="text-center">Value</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
            reports && reports.map(report => <TableRow key={`${report.id}`} report={report}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {report} = props;
  return (
    <tr>
      <td className="text-center">{report.id}</td>
      <td className="text-center">{report.date}</td>
      <td className="text-center">{report.inspector.name}</td>
      <td className="text-center">{report.cosumer.name}</td>
      <td className="text-center">{report.place.name}</td>
      <td className="text-center">{report.place.meter.number}</td>
      <td className="text-center">{report.current_data.value}</td>
    </tr>
  );
}

export default ReportList;