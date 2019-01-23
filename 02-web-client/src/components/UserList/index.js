import React, {Component} from 'react';
import api from '../../lib/api';
//import ProgressBar from '../ProgressBar';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      users: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    api.getAllUsers(this.props.user.token)
      .then(
        users => {
          if (users) {
            this.setState({...this.state, users: users, isLoaded: true});
          }
        },
        ({error}) => {
          this.setState({...this.state, isLoaded: true}, () => {
            this.props.showWarningAlert(error.message);
          });
        }
      )
      .catch(({error}) => {
        this.setState({...this.state, isLoaded: true}, () => {
          this.props.showWarningAlert(error.message);
        });
      });
  };

  render() {
    return (
      <div className="container justify-content-center pt-2">
        {
          this.state.isLoaded ? <Table users={this.state.users}/> : null
        }
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