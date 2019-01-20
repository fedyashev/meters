import React, { Component } from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';

import Login from '../Login';
import Owner from '../Owner';
import Inspector from '../Inspector';
import Consumer from '../Consumer';

import api from '../../lib/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      alert: null
    }
  }

  handlerLogout = () => {
    this.setState({...this.state, user: null}, () => {
      this.props.history.index = -1;
      this.props.history.push('/login');
    });
  }

  handlerlogin = (login, password) => {
    if (!login || !password) {
      this.setState({...this.state, alert: {type: 'warning', message: 'Incorrect login or password'}});
      return;
    }
    api.login(login, password)
      .then(user => {
        this.setState({...this.state, user}, () => {
          switch (user.role) {
            case 'ADMIN' : {
              this.props.history.push('/owner');
              break;
            }
            case 'OWNER' : {
              this.props.history.push('/owner');
              break;
            }
            case 'INSPECTOR' : {
              this.props.history.push('/inspector');
              break;
            }
            case 'CONSUMER' : {
              this.props.history.push('/consumer');
              break;
            }
            default: {
              this.props.history.push('/login');
            }
          }
        });
      })
      .catch(({error}) => {
        this.setState({...this.state, alert: {type: 'warning', message: error.message}})
      });
  }

  handlerCloseAlert = () => {
    this.setState({...this.state, alert: null});
  }

  componentDidMount() {
    this.props.history.push('/login');
  }

  render() {
    const {user} = this.state;
    console.log("APP", user);
    return (
      <div>
        <Switch>

          <Route exact path='/login' 
            render={
              props => <Login {...props}
                alert={this.state.alert}
                handlerLogin={this.handlerlogin}
                handlerCloseAlert={this.handlerCloseAlert}/>
            }
          />

          <Route exact path='/owner' render={props => <Owner {...props} user={user} handlerLogout={this.handlerLogout}/>}/>
          <Route exact path='/inspector' render={props => <Inspector {...props} user={user} handlerLogout={this.handlerLogout}/>}/>
          <Route exact path='/consumer' render={props => <Consumer {...props} user={user} handlerLogout={this.handlerLogout}/>}/>
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
