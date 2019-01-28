import React from 'react';
import NavBar from '../NavBar';
import {Link} from 'react-router-dom';

const OwnerInfo = props => {
  if (props.user) {
    return (
      <div className="container">
        <NavBar {...props}>
          <Link className="nav-link" to={`/owner/user/changePassword`}>Поменять пароль</Link>
        </NavBar>
        <h3 className="text-center mb-2">Пользователь</h3>
        <div className="table-responsive">
          <table className="table table-hover table-sm border-bottom">
            <tbody>
              <tr>
                <td><span className="font-weight-bold">Id</span></td>
                <td><span className="font-weight-bold">{props.user.id}</span></td>
              </tr>
              <tr>
                <td><span className="font-weight-bold">Логин</span></td>
                <td><span className="font-weight-bold">{props.user.login}</span></td>
              </tr>
              <tr>
                <td><span className="font-weight-bold">Роль</span></td>
                <td><span className="font-weight-bold">{props.user.role}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return null;
};

export default OwnerInfo;