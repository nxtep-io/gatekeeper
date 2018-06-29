import * as React from 'react';
import { Alert } from 'reactstrap';
import { User } from 'gatekeeper-sdk';
import { Link } from 'react-router-dom';

import './Recover.scss';
import { Spinner } from '../../components';

export interface RecoverViewProps {
  error?: Error;
  isLoading: boolean;
  userCreated?: User;
  usersRecoverPassword(email: string): Promise<void>;
}

export interface RecoverViewState {
  success?: boolean;
}

export default class RecoverView extends React.Component<RecoverViewProps, RecoverViewState> {
  state: RecoverViewState = {};

  componentWillReceiveProps(nextProps: RecoverViewProps) {
    if (this.props.isLoading && !nextProps.isLoading && !nextProps.error) {
      this.setState({ success: true });
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    const email = event.target.email.value;
    return this.props.usersRecoverPassword(email);
  }

  render() {
    return (
      <div className="form-recover-container text-center">
        <Spinner visible={this.props.isLoading} />

        <form className="form-recover" onSubmit={(event: any) => this.onSubmit(event)}>

          <img
            alt=""
            width="72"
            height="72"
            className="mb-4"
            src={require('../../assets/logo.svg')} />

          <h1 className="h3 mb-3 font-weight-normal">Recover your credentials</h1>

          {this.props.error ? (
            <Alert color="danger">{this.props.error || 'Unknown error'}</Alert>
          ) : null}

          {this.state.success ? (
            <Alert color="success">Please, check your email for further instructions</Alert>
          ) : null}

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
