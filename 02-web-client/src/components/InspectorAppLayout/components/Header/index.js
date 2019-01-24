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
                    <Link className="navbar-brand" to="/inspector/user">{user.login}</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/inspector/places">Места</Link>
                            </li>
                            <li className="nav-item">
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