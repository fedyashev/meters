import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Header from './components/Header';
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
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default withRouter(Owner);
