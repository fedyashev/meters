import React, {Component} from 'react';
import api from '../../lib/api';

class InspectorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspectors: []
    };
  }

  componentDidMount() {
    api.getAllInspectors(this.props.user.token)
      .then(inspectors => {
        console.log(inspectors);
        if (inspectors) {
          this.setState({...this.state, inspectors: inspectors});
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        <NavBar/>
        <Table users={this.state.inspectors}/>
      </div>
    );
  }

};

const NavBar = props => {
  return (
  <nav className="nav">
    <a className="nav-link" href="#">Добавить</a>
  </nav>
  );
};

const Table = props => {
  const {inspectors} = props;
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Name</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
          inspectors && inspectors.map(inspector => <TableRow key={`${inspector.id}-${inspector.name}`} inspector={inspector}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {inspector} = props;
  return (
    <tr>
      <td className="text-center">{inspector.id}</td>
      <td className="text-center">{inspector.name}</td>
    </tr>
  );
}

export default InspectorList;