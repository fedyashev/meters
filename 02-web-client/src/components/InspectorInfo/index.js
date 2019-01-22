import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../lib/api';

class InspectorInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspector: {
        id: props.match.params.inspector_id
      },
      user: props.user
    }
  }

  componentDidMount() {
    api.getInspectorById(this.state.user.token, this.state.inspector.id)
      .then(inspector => {
        if (inspector) {
          this.setState({...this.state, inspector: inspector});
        }
        else {
          this.props.setAlert('warning', 'Inspector not found');
        }
      })
      .catch(({error}) => {
        this.props.setAlert('warning', error.message);
      });
  }

  render() {
    const {inspector} = this.state;
    return (
      <div className="container pt-2">
        <NavBar inspector={inspector}/>
        <h3 className="text-center mb-2">Инспектор</h3>
        <div className="border-top border-bottom">
          <div>
            <span className="font-weight-bold">Id</span> : <span>{inspector.id}</span>
          </div>
          <div>
            <span className="font-weight-bold">Логин</span> : <span>{inspector.login}</span>
          </div>
          <div>
            <span className="font-weight-bold">Имя</span> : <span>{inspector.name}</span>
          </div>
        </div>
      </div>
    );
  }
};

const NavBar = props => {
  const {inspector} = props;
  return (
    <nav className="nav mb-2">
      <Link className="nav-link" to={`/owner/inspectors/${inspector.id}/update`}>Редактировать</Link>
      <Link className="nav-link" to={`/owner/inspectors/${inspector.id}/delete`}>Удалить</Link>
      <Link className="nav-link" to={`/owner/inspectors/${inspector.id}/changeName`}>Редактировать</Link>
      <Link className="nav-link" to={`/owner/inspectors/${inspector.id}/changePassword`}>Редактировать</Link>
    </nav>
  );
}

export default InspectorInfo;