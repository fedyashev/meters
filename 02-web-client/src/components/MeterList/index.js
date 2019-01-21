import React, {Component} from 'react';
import api from '../../lib/api';

class MeterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      meters: []
    };
  }

  componentDidMount() {
    api.getAllMeters(this.props.user.token)
      .then(meters => {
        console.log(meters);
        if (meters) {
          this.setState({...this.state, meters: meters});
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        <Table users={this.state.meters}/>
      </div>
    );
  }

};

const Table = props => {
  const {meters} = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Number</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
            meters && meters.map(meter => <TableRow key={`${meter.id}-${meter.number}`} meter={meter}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {meter} = props;
  return (
    <tr>
      <td className="text-center">{meter.id}</td>
      <td className="text-center">{meter.number}</td>
    </tr>
  );
}

export default MeterList;