import React from 'react';
import './App.css';
import { Switch, Route,  withRouter, Redirect } from 'react-router-dom';
import ROUTER from '../src/constants/Router';
import AppLayout from './pages/AppLayout/index';
import Resgiter from './pages/auth/Register';
import login from './pages/auth/login';
class App extends React.Component {
  

  render() {
      return (
        <Switch>
          <Route path={ROUTER.AUTH.LOGIN} component={login} />      
          <Route path={ROUTER.AUTH.REGISTER} component={Resgiter} />
          <Route path={ROUTER.HOME} render={props => (
              localStorage.getItem('jwtToken') 
                  ? <AppLayout />
                  : <Redirect to={{ pathname: ROUTER.AUTH.LOGIN, state: { from: props.location } }} />
          )} /> 
          <Redirect from="*" to={ROUTER.HOME} />
        </Switch>
       );
    }
}





export default  withRouter(App);
