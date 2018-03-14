import React, { Component } from 'react';
import LoginPage from '../containers/LoginPage';
import Home from '../containers/Home';
import NewTodoForm from '../containers/NewTodoForm';
import NavBar from '../containers/NavBar';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { history } from '../store/configureStore';


const PrivateRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route
            {...props}
            render={(props) => authenticated === true
                ? <div><NavBar><Component {...props} /></NavBar></div>
              : <Redirect to={{pathname: '/LoginPage', state: {from: props.location}}} />}
        />
    );
};

const PublicRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route
            {...props}
            render={(props) => authenticated === false
                ? <Component {...props} />
              : <Redirect to='/Home' />}
        />
    );
};

class App extends Component {

  render() {
    return (
        <ConnectedRouter history={history}>
          <div>

                <Switch>
                <PrivateRoute authenticated={this.props.authenticated }  path="/Todo/new" component={ NewTodoForm } />
                <PrivateRoute authenticated={this.props.authenticated }  path="/Home" component={ Home } />
                <PrivateRoute authenticated={this.props.authenticated } exact path="/" component={Home} />
                </Switch>

              <PublicRoute authenticated={this.props.authenticated }  path="/LoginPage" component={ LoginPage } />
          </div>
        </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(App);
