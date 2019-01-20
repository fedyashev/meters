import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class Owner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user
        }
    }

    render() {
        const {user} = this.state;
        console.log('OWNER', user);
        return (
            <div>
                <Header user={user} handlerLogout={this.props.handlerLogout}/>
                <Main />
                <Footer />
            </div>
        );
    }
}

export default withRouter(Owner);
