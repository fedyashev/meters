import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Alert from '../Alert';

class Owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            alert: null
        }
    }

    handlerCloseAlert = () => {
        this.setState({ ...this.state, alert: null });
    }

    setAlert = (type, message) => {
        this.setState({...this.state, alert: {type, message}});
    };

    render() {
        const { user } = this.state;
        console.log('OWNER', user);
        return (
            <div>
                <Header user={user} handlerLogout={this.props.handlerLogout} />
                {this.state.alert && <Alert type={this.state.alert.type} message={this.state.alert.message} handlerCloseAlert={this.handlerCloseAlert} />}
                {
                    this.props.children && React.Children.map(this.props.children, child =>
                        React.cloneElement(child, {setAlert: this.setAlert})
                    )
                }
                <Footer />
            </div>
        );
    }
}

export default withRouter(Owner);
