import * as React from 'react';
import * as moment from 'moment';
import * as BaseSwal from 'sweetalert2';
import * as withReactContent from 'sweetalert2-react-content';
import { Alert, Input, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { User, UserRole, UserStatus, UserSchema, Session } from 'gatekeeper-sdk';
import { Link, Redirect } from 'react-router-dom';
import { UserRoleBadge, UserStatusBadge, Logo, AccountForm } from '../../components';

import './Account.scss';

const SweetAlert = (withReactContent as any)(BaseSwal);

export interface AccountViewProps {
  history: any;
  user?: User;
  error?: Error;
  isLoading: boolean;
  userUpdated?: User;
  usersUpdate(id: string, user: UserSchema): void;
}

export interface AccountViewState {
  editing?: string;
}

export default class AccountView extends React.Component<AccountViewProps, AccountViewState> {
  session: Session;

  constructor(props: AccountViewProps) {
    super(props);
    this.state = { editing: '' };
    this.session = Session.getInstance({});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && !nextProps.isLoading && nextProps.userUpdated) {
      const current = this.session.current;

      // If just updated current user, register it in session
      if (current && current.id === nextProps.userUpdated.id) {
        this.session.register(new User({ ...nextProps.userUpdated, credentials: current.credentials }));
      }

      this.setState({ editing: '' });
    }
  }

  async onEdit(field: string, user: UserSchema) {
    const { name, password } = user;
    await this.setState({ editing: field });
    return this.props.usersUpdate(user.id, { name, password });
  }

  render() {
    const { user } = this.props;
    const { editing } = this.state;

    const SettingsButton = ({ }) => user.role === UserRole.ROOT ? (
      <Button tag={Link} to="/dashboard" outline className="delete-btn float-right m-auto" size="sm" color="primary">
        <i className="md-text material-icons">build</i>
      </Button>
    ) : null;

    const LogoutButton = ({ }) => (
      <Button
        outline
        size="sm" color="danger"
        className="delete-btn float-right m-auto"
        onClick={() => this.session.destroy().then(() => this.props.history.push('/'))}>
        <i className="md-text material-icons">exit_to_app</i> Logout
      </Button>
    );

    return (
      <div className="form-account-container">
        <div className="card">
          <div className="card-body">
            <div className="form-account-title">
              <Logo />
              <h3 className="h3 m-2 font-weight-normal"> Account </h3>
              <SettingsButton /> &nbsp;
              <LogoutButton />
            </div>

            {this.props.error ? (
              <Alert color="danger" className="mt-4">
                {this.props.error.message || this.props.error}
              </Alert>
            ) : null}

            {!user ? (
              <Alert color="warning" className="mt-4">
                Credentials expired or unavailable
              </Alert>
            ) : null}

            <div className="mt-2 card-text text-left">
              {user ? (
                <AccountForm
                  user={user}
                  isLoading={this.props.isLoading ? this.state.editing : ''}
                  onSubmit={(field: string, user: UserSchema) => this.onEdit(field, user)} />
              ) : (
                  <div style={{ height: 200, width: '100%' }}>&nbsp;</div>
                )}
            </div>
          </div>
          <div className="card-footer text-right">
            <small className="text-muted">
              <Logo size={32} className="float-left" />
              <b>Gatekeeper v{process.env.PACKAGE_VERSION}</b>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
