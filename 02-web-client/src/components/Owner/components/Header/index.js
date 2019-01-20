import React from 'react';
import {Link} from 'react-router-dom';

const Header = props => {
    const {user} = props;
    const {handlerLogout} = props;
    const onClickLogout = e => {
        e.preventDefault();
        handlerLogout();
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="">{user.login}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="">Пользователи</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Инспекторы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Потребители</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Счетчики</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Места</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Отчеты</a>
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link" href="#">Logout</a> */}
                                <Link className="nav-link text-warning" to="/logout" onClick={onClickLogout}>Выход</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;