import React, {Component} from 'react';
import api from '../../lib/api';

class ConsumerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      consumers: []
    };
  }

  componentDidMount() {
    api.getAllConsumers(this.props.user.token)
      .then(consumers => {
          console.log(consumers);
        if (consumers) {
          this.setState({...this.state, consumers: consumers});
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        <Table consumers={this.state.consumers}/>
      </div>
    );
  }

};

const Table = props => {
  const {consumers} = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Login</th>
          <th scope="col" className="text-center">Name</th>
          <th scope="col" className="text-center">Email</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
            consumers && consumers.map(consumer => <TableRow key={`${consumer.id}-${consumer.login}-${consumer.name}-${consumer.email}`} consumer={consumer}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {consumer} = props;
  return (
    <tr>
      <td className="text-center">{consumer.id}</td>
      <td className="text-center">{consumer.login}</td>
      <td className="text-center">{consumer.name}</td>
      <td className="text-center">{consumer.email}</td>
    </tr>
  );
}

export default ConsumerList;