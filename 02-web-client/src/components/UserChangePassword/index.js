import React from 'react';
import api from '../../lib/api';
import NavBar from '../NavBar';

const UserChangePassword = props => {
  let password, confirmPassword;
  const user = props.user
  const onClickSave = e => {
    e.preventDefault();
    if (password.value === confirmPassword.value) {
      api.changeUserPassword(user.token, user.id, password.value)
        .then(done => {
          if (done) {
            props.showSuccessAlert('Пароль изменен');
            props.history.goBack();
          }
          else {
            props.showWarningAlert('Неудалось изменить пароль');
          }
        })
        .catch(({error}) => {
          props.showWarningAlert(error.message);
        });
    }
    else {
      props.showWarningAlert('Пароли не совпадают');
    }
  };
  if (user) {
    return (
      <div className="container">
        <NavBar {...props}/>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="text-center font-weight-bold mb-5">
              <h3>Смена пароля</h3>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control" type="password" placeholder="Новый пароль" required ref={r => password = r}/>
              </div>
              <div className="form-group">
                <input className="form-control" type="password" placeholder="Подтвердить пароль" required ref={r => confirmPassword = r}/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={onClickSave}>Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserChangePassword;
