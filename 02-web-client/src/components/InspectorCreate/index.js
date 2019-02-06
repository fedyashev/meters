import React, {Component} from 'react';

import api from '../../lib/api';
import ProgressBar from '../ProgressBar';
import NavBar from '../NavBar';

class InspectorCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      isProcessing: false
    }
  }

  handleInspectorCreate = (login, password, name) => {
    const token = this.state.user.token;
    this.setState({...this.state, isProcessing: true});
    api.createInspector(token, login, password, name)
      .then(inspector => {
        if (inspector) {
          this.setState({...this.state, isProcessing: false}, () => {
            this.props.history.goBack();
          });
        }
      })
      .catch(({error}) => {
        this.setState({...this.state, isProcessing: false}, () => {
          this.props.setAlert('warning', error.message);
        });
      });
  }

  render() {

    let login, password, confirmPassword, name;

    const onClickCreateInspector = e => {
      e.preventDefault();
      if (password.value !== confirmPassword.value) {
        this.props.setAlert('warning', 'Не верный пароль');
      }
      else {
        this.handleInspectorCreate(login.value, password.value, name.value);
      }
    }

    return (
      <div>
        <div className="container">
          <NavBar {...this.props}/>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
              <div className="text-center font-weight-bold mb-5">
                  <h3>Добавить инспектора</h3>
              </div>
              <form>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="Логин" required autoFocus ref={r => login = r}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="password" placeholder="Пароль" required ref={r => password = r}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="password" placeholder="Подтвердить пароль" required ref={r => confirmPassword = r}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="Ф.И.О. инспектора" required ref={r => name = r}/>
                </div>
                {
                  this.state.isProcessing ?
                    <ProgressBar message={'Обработка...'} large={true}/> :
                    <div className="form-group">
                      <button className="btn btn-primary btn-block" onClick={onClickCreateInspector}>Создать</button>
                    </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InspectorCreate;