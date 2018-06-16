import * as React from 'react';
import { Alert } from 'reactstrap';
import { User } from 'gatekeeper-sdk';
import { Link } from 'react-router-dom';

import './Password.scss';

export interface PasswordViewProps {
  match?: any;
  error?: Error;
  isLoading: boolean;
  userCreated?: User;
  usersSetPassword(data: { token: string, password: string }): Promise<void>;
}

export interface PasswordViewState {
  success?: boolean;
  error?: boolean;
}

export default class PasswordView extends React.Component<PasswordViewProps, PasswordViewState> {
  state: PasswordViewState = {};

  componentWillReceiveProps(nextProps: PasswordViewProps) {
    if (this.props.isLoading && !nextProps.isLoading && !nextProps.error) {
      this.setState({ success: true, error: false });
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const token = this.props.match.params.token;
    const password = event.target.password.value;
    const confirmation = event.target.confirmPassword.value;

    if (!token) {
      throw new Error('No token provided');
    } else if (password !== confirmation) {
      this.setState({ error: true });
    } else {
      return this.props.usersSetPassword({ token, password });
    }
  }

  render() {
    return (
      <div className="form-signup-container text-center">
        <form className="form-signup" onSubmit={(event: any) => this.onSubmit(event)}>

          <img
            alt=""
            width="72"
            height="72"
            className="mb-4"
            src={require('../../assets/logo.svg')} />

          <h1 className="h3 mb-3 font-weight-normal">Set your password</h1>

          {this.state.error ? (
            <Alert color="danger">
              Invalid password combination
            </Alert>
          ) : null}

          {this.state.success ? (
            <Alert color="success">Password successfully set</Alert>
          ) : null}

          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required />

          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm your Password"
            required />

          <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

          <br />
          <Link to="/">Back to login</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
