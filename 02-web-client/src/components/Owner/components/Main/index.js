import React from 'react';
import {Switch, Route} from 'react-router-dom';

import UserList from '../UserList';

const Main = props => {
    const {user} = props.user;
    return (
        <Switch>
            <Route exact path='/owner/users' render={props => <UserList {...props} user={user}/>}/>
        </Switch>
    );
};

export default Main;