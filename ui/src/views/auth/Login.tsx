import * as React from 'react';
import { Alert } from 'reactstrap';
import { User, Session } from 'gatekeeper-sdk';
import { Link, Redirect } from 'react-router-dom';

import './Login.scss';
import { Logo, Spinner } from '../../components';

export interface LoginViewProps {
  user?: User;
  error?: Error;
  isLoading?: boolean;
  loginAccountEmail(email: string, password: string): Promise<void>;
}

export interface LoginViewState {
}

export default class LoginView extends React.Component<LoginViewProps, LoginViewState> {
  session: Session;

  constructor(props: LoginViewProps) {
    super(props);
    this.session = Session.getInstance({});
  }

  onSubmit(event: any) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    return this.props.loginAccountEmail(email, password);
  }

  render() {
    const { isLoading } = this.props;

    if (this.session.current) {
      return <Redirect to="/account" />;
    }

    return (
      <div className="form-signin-container text-center">
        <Spinner visible={isLoading} />
        <form className="form-signin" onSubmit={(event: any) => this.onSubmit(event)}>

          <Logo size={72} />

          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>

          <br />

          {this.props.error ? (
            <Alert color="danger">
              Invalid credentials
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
          <div className="divider">
            <div className="divider-dash" />
            <span>or</span>
            <div className="divider-dash" />
          </div>
          <Link className="btn btn-lg btn-success btn-block" to="/signup">Create a new account</Link>
          <br />
          <br />
          <Link to="/recover">Recover credentials</Link>
          <p className="mt-5 mb-3 text-muted">powered by Gatekeeper</p>
        </form>
      </div>
    );
  }
}
