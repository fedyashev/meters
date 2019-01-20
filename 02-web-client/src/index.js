import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';

import App from './components/App';

ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, document.getElementById('root'));