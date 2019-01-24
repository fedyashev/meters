import React, { Component } from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';

import Login from '../Login';

import UserChangePassword from '../UserChangePassword';

import Owner from '../Owner';
import OwnerInfo from '../OwnerInfo';

//import UserList from '../UserList';

import InspectorList from '../InspectorList';
import InspectorCreate from '../InspectorCreate';
import InspectorInfo from '../InspectorInfo';
import InspectorUpdate from '../InspectorUpdate';
import InspectorDelete from '../InspectorDelete';

import ConsumerList from '../ConsumerList';
import ConsumerCreate from '../ConsumerCreate';
import ConsumerInfo from '../ConsumerInfo';
import ConsumerUpdate from '../ConsumerUpdate';
import ConsumerDelete from '../ConsumerDelete';

import MeterList from '../MeterList';
import MeterCreate from '../MeterCreate';
import MeterInfo from '../MeterInfo';
import MeterUpdate from '../MeterUpdate';
import MeterDelete from '../MeterDelete';
import MeterAddData from '../MeterAddData';

import PlaceList from '../PlaceList';
import PlaceCreate from '../PlaceCreate';
import PlaceInfo from '../PlaceInfo';
import PlaceUpdate from '../PlaceUpdate';
import PlaceDelete from '../PlaceDelete';

import ReportList from '../ReportList';

import InspectorAppLayout from '../InspectorAppLayout';
import PlaceAuditList from '../InspectorAppLayout/components/PlaceAuditList';
import PlaceAuditInfo from '../InspectorAppLayout/components/PlaceAuditInfo';

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

{/* =================================================================================== */}

          <Route exact path='/login' render={props => <Login {...props} alert={this.state.alert} handlerLogin={this.handlerlogin} handlerCloseAlert={this.handlerCloseAlert}/>}/>
          <Route exact path='/owner' render={props => <Owner {...props} user={user} handlerLogout={this.handlerLogout}/>}/>
          <Route exact path='/inspector' render={props => <InspectorAppLayout {...props} user={user} handlerLogout={this.handlerLogout}/>}/>
          <Route exact path='/consumer' render={props => <Consumer {...props} user={user} handlerLogout={this.handlerLogout}/>}/>

{/* =================================================================================== */}

          <Route exact path='/inspector/places'
            render={
              props =>
                <InspectorAppLayout {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceAuditList {...props} user={user}/>
                </InspectorAppLayout>
            }
          />

          <Route exact path='/inspector/places/:place_id'
            render={
              props =>
                <InspectorAppLayout {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceAuditInfo {...props} user={user}/>
                </InspectorAppLayout>
            }
          />

{/* =================================================================================== */}

          {/*
          <Route exact path='/owner/users'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <UserList {...props} user={user}/>
                </Owner>
            }
          />
          */}

          <Route exact path='/owner/user'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <OwnerInfo {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/user/changePassword'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <UserChangePassword {...props} user={user}/>
                </Owner>
            }
          />

{/* =================================================================================== */}

          <Route exact path='/owner/inspectors'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <InspectorList {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/inspectors/create'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <InspectorCreate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/inspectors/:inspector_id'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <InspectorInfo {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/inspectors/:inspector_id/update'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <InspectorUpdate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/inspectors/:inspector_id/delete'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <InspectorDelete {...props} user={user}/>
                </Owner>
            }
          />

{/* =================================================================================== */}

          <Route exact path='/owner/consumers'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <ConsumerList {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/consumers/create'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <ConsumerCreate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/consumers/:consumer_id'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <ConsumerInfo {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/consumers/:consumer_id/update'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <ConsumerUpdate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/consumers/:consumer_id/delete'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <ConsumerDelete {...props} user={user}/>
                </Owner>
            }
          />

{/* =================================================================================== */}

          <Route exact path='/owner/meters'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <MeterList {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/meters/create'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <MeterCreate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/meters/:meter_id'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <MeterInfo {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/meters/:meter_id/update'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <MeterUpdate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/meters/:meter_id/delete'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <MeterDelete {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/meters/:meter_id/addData'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <MeterAddData {...props} user={user}/>
                </Owner>
            }
          />

{/* =================================================================================== */}

          <Route exact path='/owner/reports'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <ReportList {...props} user={user}/>
                </Owner>
            }
          />

{/* =================================================================================== */}

          <Route exact path='/owner/places'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceList {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/places/create'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceCreate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/places/:place_id'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceInfo {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/places/:place_id/update'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceUpdate {...props} user={user}/>
                </Owner>
            }
          />

          <Route exact path='/owner/places/:place_id/delete'
            render={
              props =>
                <Owner {...props} user={user} handlerLogout={this.handlerLogout}>
                  <PlaceDelete {...props} user={user}/>
                </Owner>
            }
          />

{/* =================================================================================== */}


        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
