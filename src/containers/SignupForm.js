import React, { Component } from 'react';
import * as Actions from '../actions/index';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class SignupForm extends Component {
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
    console.log("Values is: ", values);
    this.props.signUp(values);
  };

  render() {
    return (
      <div>
        <h3 className="login-text">Sign up now</h3>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <FormGroup
            controlId="login-form"
          >
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
            <Button bsStyle="primary" type="submit" block>Sign up</Button>
          </FormGroup>
        </form>
        <div><a className="bottom-link" onClick={this.props.handleLoginClick}>Already have an account? Login!</a></div>
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
  form: 'signupForm'
})(SignupForm));
