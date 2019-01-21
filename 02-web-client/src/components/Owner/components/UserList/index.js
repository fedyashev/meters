import React, {Component} from 'react';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      users: []
    };
  }

  render() {
    return (
      <div>
        <p>Users list</p>
      </div>
    );
  }

};

export default UserList;