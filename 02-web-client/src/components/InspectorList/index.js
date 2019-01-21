import React, {Component} from 'react';

class InspectorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      inspectors: []
    };
  }

  render() {
    return (
      <div>
        <p>Inspector List</p>
      </div>
    );
  }

};

export default InspectorList;