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
        <div className="border-top border-bottom">
          <div>
            <span className="font-weight-bold">Id</span> : <span>{props.user.id}</span>
          </div>
          <div>
            <span className="font-weight-bold">Логин</span> : <span>{props.user.login}</span>
          </div>
          <div>
            <span className="font-weight-bold">Роль</span> : <span>{props.user.role}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default OwnerInfo;