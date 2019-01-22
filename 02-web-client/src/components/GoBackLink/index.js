import React from 'react';
import {Link} from 'react-router-dom';

const GoBackLink = props => <Link className="nav-link" to='/back' onClick={e => {e.preventDefault(); props.history.goBack();}}>Назад</Link>;

export default GoBackLink;