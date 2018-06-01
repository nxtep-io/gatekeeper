import * as React from 'react';
import { Alert } from 'reactstrap';
import { User } from 'gatekeeper-sdk';

import './Login.scss';

export interface LoginViewProps {
  user?: User;
  loginAccountEmail(email: string, password: string): Promise<void>;
}

export default class LoginView extends React.Component<any, any> {
  onSubmit(event: any) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    return this.props.loginAccountEmail(email, password);
  }

  render() {
    return (
      <div className="form-signin-container text-center">
        <form className="form-signin" onSubmit={(event: any) => this.onSubmit(event)}>

          <img
            alt=""
            width="72"
            height="72"
            className="mb-4"
            src={require('../../assets/logo.svg')} />

          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>

          {this.props.error ? (
            <Alert color="danger">
              Invalid credentials
            </Alert>
          ) : null}

           {this.props.user ? (
            <Alert color="success">
              Welcome {this.props.user.name}!
            </Alert>
          ) : null}

          <label data-for="inputEmail" className="sr-only">Email address</label>
          <input type="email" name="email" className="form-control" placeholder="Email address" required />
          <label data-for="inputPassword" className="sr-only">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
