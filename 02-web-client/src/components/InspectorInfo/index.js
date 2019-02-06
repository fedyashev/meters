import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';

class InspectorInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspector: {
        id: props.match.params.inspector_id
      },
      user: props.user,
      isLoaded: false
    }
  }

  componentDidMount() {
    api.getInspectorById(this.state.user.token, this.state.inspector.id)
      .then(inspector => {
        if (inspector) {
          this.setState({ ...this.state, inspector, isLoaded: true });
        }
        else {
          this.setState({...this.state, isLoaded: true}, () => {
            this.props.showWarningAlert('Инспектор не найден');
          });
        }
      })
      .catch(({ error }) => {
          this.setState({...this.state, isLoaded: true}, () => {
            this.props.showWarningAlert(error.message);
          });
      });
  }

  render() {
    if (!this.state.isLoaded) return <ProgressBar/>;
    const { inspector } = this.state;
    return (
      <div className="container pt-2">
        <NavBar {...this.props}>
          <Link className="nav-link" to={`/owner/inspectors/${inspector.id}/update`}>Изменить</Link>
          <Link className="nav-link" to={`/owner/inspectors/${inspector.id}/delete`}>Удалить</Link>
        </NavBar>
        <h3 className="text-center mb-2">Инспектор</h3>
        <div className="table-responsive">
          <table className="table table-hover table-sm border-bottom">
            <tbody>
              <tr>
                <td><span className="font-weight-bold">Id</span></td>
                <td><span className="font-weight-bold">{inspector.id}</span></td>
              </tr>
              <tr>
                <td><span className="font-weight-bold">Логин</span></td>
                <td><span className="font-weight-bold">{inspector.login}</span></td>
              </tr>
              <tr>
                <td><span className="font-weight-bold">Имя</span></td>
                <td><span className="font-weight-bold">{inspector.name}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default InspectorInfo;