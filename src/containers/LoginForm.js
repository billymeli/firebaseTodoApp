import React, { Component } from 'react';
import * as Actions from '../actions/index';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `${touched && error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <FormControl type={field.type} {...field.input} placeholder={field.placeholder} bsClass="form-control input-form" />
        <FormControl.Feedback />
        <div className="help-block">
        {touched ? error : ''}
        </div>
      </div>
    );
  }

  handleFormSubmit = (values) => {
    this.props.signIn(values);
  };

  render() {
    return (
      <div>
        <h3 className="login-text">Login to your account</h3>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <FormGroup>
            <Field
              type="email"
              placeholder="Email"
              name="email"
              component={this.renderField}
            />
            <Field
              type="password"
              placeholder="Password"
              name="password"
              component={this.renderField}
            />
          <Button bsStyle="primary" type="submit" block>Login</Button>
          </FormGroup>
        </form>
        <div><a className="bottom-link" onClick={this.props.handleSignupClick}>Don't have an account? Sign up now!</a></div>
      </div>

    );
  }
}
function validate(values) {
   const errors = {};

   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   if (!values.password) {
     errors.password = 'Required';
   }
   return errors;
 }

function mapStateToProps(state) {
   return {
     authenticationError: state.auth.error,
     authenticated: state.auth.authenticated
   }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  validate,
  form: 'loginForm'
})(LoginForm));
