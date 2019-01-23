import React from 'react';
import {Link} from 'react-router-dom';

const NavLink = props => {
  const onClickBack = e => {
    e.preventDefault();
    props.history.goBack();
  };
  return (
    <nav className="nav my-2">
      <Link className="nav-link" to="/back" onClick={onClickBack}><i className="fas fa-arrow-left"></i></Link>
      {
        props.children
      }
    </nav>
  );
};

export default NavLink;