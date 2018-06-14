import * as React from 'react';
import { Alert } from 'reactstrap';
import { User } from 'gatekeeper-sdk';
import { Link } from 'react-router-dom';

import './Recover.scss';

export interface RecoverViewProps {
  error?: Error;
  isLoading: boolean;
  userCreated?: User;
  usersCreate(data: { name: string, email: string, password: string }): Promise<void>;
}

export interface RecoverViewState {
}

export default class RecoverView extends React.Component<RecoverViewProps, RecoverViewState> {
  onSubmit(event: any) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    return this.props.usersCreate({ name, email, password });
  }

  render() {
    return (
      <div className="form-recover-container text-center">
        <form className="form-recover" onSubmit={(event: any) => this.onSubmit(event)}>

          <img
            alt=""
            width="72"
            height="72"
            className="mb-4"
            src={require('../../assets/logo.svg')} />

          <h1 className="h3 mb-3 font-weight-normal">Recover your credentials</h1>

          <input type="email" name="email" className="form-control" placeholder="Email address" required />

          <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

          <br />
          <Link to="/signup">Create an account</Link>

          <br /><br />
          <Link to="/">Back to Login</Link>

          <p className="mt-5 mb-3 text-muted">powered by Gatekeeper</p>
        </form>
      </div>
    );
  }
}
