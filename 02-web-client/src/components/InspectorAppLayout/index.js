import React, {Component} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Alert from '../Alert';

import api from '../../lib/api';

class InspectorAppLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            inspector: {},
            alert: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        const token = this.state.user.token;
        const user_id = this.state.user.id;
        api.getInspectorByUserId(token, user_id)
            .then(inspector => {
                if (inspector) {
                    this.setState({...this.state, inspector, isLoaded: true});
                }
                else {
                    this.props.handlerLogout();
                }
            })
            .catch(({error}) => {
                this.props.handlerLogout();
            });
    }

    handlerCloseAlert = () => {
        this.setState({...this.state, alert: null});
    }

    setAlert = (type, message) => {
        this.setState({...this.state, alert: {type, message}});
    };

    showWarningAlert = message => {
        this.setState({...this.state, alert: {type: 'warning', message}});
    }

    showSuccessAlert = message => {
        this.setState({...this.state, alert: {type: 'success', message}});
    }

    render() {
        if (!this.state.isLoaded) return null;
        const { user } = this.state;
        return (
            <div>
                <Header user={user} handlerLogout={this.props.handlerLogout} />
                {this.state.alert && <Alert type={this.state.alert.type} message={this.state.alert.message} handlerCloseAlert={this.handlerCloseAlert} />}
                {
                    this.props.children && React.Children.map(this.props.children, child =>
                        React.cloneElement(child, {setAlert: this.setAlert, showWarningAlert: this.showWarningAlert, showSuccessAlert: this.showSuccessAlert, inspector: this.state.inspector})
                    )
                }
                <Footer />
            </div>
        );
    }
};

export default InspectorAppLayout;