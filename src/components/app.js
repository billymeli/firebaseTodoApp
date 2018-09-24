import React, { Component } from 'react';
import LoginPage from '../containers/LoginPage';
import NavBar from '../containers/NavBar';
import GifBrowser from '../containers/GifBrowser';
import MyGifs from '../containers/MyGifs';
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
                <PrivateRoute authenticated={this.props.authenticated }  path="/MyGifs" component={ MyGifs } />
                <PrivateRoute authenticated={this.props.authenticated }  path="/Home" component={ GifBrowser } />
                <PrivateRoute authenticated={this.props.authenticated } exact path="/" component={GifBrowser} />
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
