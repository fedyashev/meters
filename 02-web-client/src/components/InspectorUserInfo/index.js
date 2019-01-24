import React from 'react';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';

const InspectorUserInfo = props => {
    const {user, inspector} = props;
    return (
        <div className="container justify-content-center">
            <NavBar {...props}>
                <Link className="nav-link" to={`/inspector/user/changePassword`}>Изменить пароль</Link>
            </NavBar>
            <h3 className="text-center mb-2">Пользователь</h3>
            <div className="border-top border-bottom">
                <div>
                    <span className="font-weight-bold">Логин</span> : <span>{user.login}</span>
                </div>
                <div>
                    <span className="font-weight-bold">Имя</span> : <span>{inspector.name}</span>
                </div>
            </div>
        </div>
    );
};

export default InspectorUserInfo;