import React, {Component} from 'react';
import api from '../../lib/api';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      users: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    api.getAllUsers(this.props.user.token)
      .then(users => {
        if (users) {
          this.setState({...this.state, users: users});
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        <Table users={this.state.users}/>
      </div>
    );
  }

};

const Table = props => {
  const {users} = props;
  console.log(users);
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center">Id</th>
          <th scope="col" className="text-center">Login</th>
          <th scope="col" className="text-center">Role</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '0.85rem'}}>
        {
          users && users.map(user => <TableRow key={`${user.id}-${user.login}-${user.role}`} user={user}/>)
        }
      </tbody>
    </table>
  );
};

const TableRow = props => {
  const {user} = props;
  return (
    <tr>
      <td className="text-center">{user.id}</td>
      <td className="text-center">{user.login}</td>
      <td className="text-center">{user.role}</td>
    </tr>
  );
}

export default UserList;