import React, { Component } from 'react';
import { Fields, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderField = ({input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" {...input} placeholder={label} type={type} />
      { touched && error && <div className="error">{error}</div> }
    </div>
  )

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="text"
          component={this.renderField} label="Email" />
        <Field name="password" type="password"
          component={this.renderField} label="Password" />
        <Field name="passwordConfirm" type="password"
          component={this.renderField} label="Password confirmation" />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  // TODO: improve validation

  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password != formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup)

export default connect(mapStateToProps, actions)(Signup);
