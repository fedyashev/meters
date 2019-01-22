import React, {Component} from 'react';

import ProgressBar from '../ProgressBar'

import api from '../../lib/api';

class InspectorUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspector: {
        id: props.match.params.inspector_id
      },
      user: props.user,
      isLoding: false
    }
  }

  componentDidMount() {
    this.setState({...this.state, isLoding: true});
    api.getInspectorById(this.state.user.token, this.state.inspector.id)
      .then(inspector => {
        if (inspector) {
          this.setState({...this.state, inspector: inspector, isLoding: false});
        }
        else {
          this.setState({...this.state, isLoding: false}, () => {
            this.props.setAlert('warning', 'Inspector not found');
          });
        }
      })
      .catch(({error}) => {
        this.setState({...this.state, isLoding: false}, () => {
          this.props.setAlert('warning', error.message);
        });
      });
  }

  render() {
    const {inspector} = this.state;
    let login, password, confirmPassword, name;
    return (
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="text-center font-weight-bold mb-5">
              <h3>Редактировать инспектора</h3>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Логин" required autoFocus ref={r => login = r} defaultValue={inspector.login}/>
              </div>
              <div className="form-group">
                <input className="form-control" type="password" placeholder="Новый пароль" required ref={r => password = r}/>
              </div>
              <div className="form-group">
                <input className="form-control" type="password" placeholder="Подтвердить пароль" required ref={r => confirmPassword = r}/>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Ф.И.О. инспектора" required ref={r => name = r} defaultValue={inspector.name}/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default InspectorUpdate;