import * as React from 'react';
import { Alert } from 'reactstrap';
import { User } from 'gatekeeper-sdk';
import { Link } from 'react-router-dom';

import './SignUp.scss';
import { Spinner } from '../../components';

export interface SignUpViewProps {
  error?: Error;
  isLoading: boolean;
  userCreated?: User;
  usersCreate(data: { name: string, email: string, password: string }): Promise<void>;
}

export interface SignUpViewState {
}

export default class SignUpView extends React.Component<SignUpViewProps, SignUpViewState> {
  onSubmit(event: any) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    return this.props.usersCreate({ name, email, password });
  }

  render() {
    return (
      <div className="form-signup-container text-center">
        <Spinner visible={this.props.isLoading} />

        <form className="form-signup" onSubmit={(event: any) => this.onSubmit(event)}>

          <img
            alt=""
            width="72"
            height="72"
            className="mb-4"
            src={require('../../assets/logo.svg')} />

          <h1 className="h3 mb-3 font-weight-normal">Create your account</h1>

          <input type="text" name="name" className="form-control" placeholder="Name" required />
          <input type="email" name="email" className="form-control" placeholder="Email address" required />
          <input type="password" name="password" className="form-control" placeholder="Password" required />

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>

          <br />
          <Link to="/">Already have an account?</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
