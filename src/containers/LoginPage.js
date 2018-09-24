import React, { Component } from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
var firebase = require("firebase");

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: true,
    }
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
  }

toggleLogin() {
  this.setState({ showLogin: false });
}
toggleSignup() {
  this.setState({ showLogin: true });
}
  render() {
    return (
      <div>
        <div>
          <h1 className='title'>Gif Browser</h1>
          <div className="login-form-container">
            { this.state.showLogin ?
              <LoginForm handleSignupClick={this.toggleLogin} /> :
              <SignupForm handleLoginClick={this.toggleSignup} />
            }
          </div>
        </div>
      </div>

    );
  }
}

export default LoginPage;
