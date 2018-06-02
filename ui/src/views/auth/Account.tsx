import * as React from 'react';
import * as moment from 'moment';
import { Alert, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { User, UserRole, UserStatus } from 'gatekeeper-sdk';
import { Link, Redirect } from 'react-router-dom';
import { UserRoleBadge, UserStatusBadge } from '../../components';

import './Account.scss';

export interface AccountViewProps {
  user?: User;
  error?: Error;
  isLoading: boolean;
}

export interface AccountViewState {
}

export default class AccountView extends React.Component<AccountViewProps, AccountViewState> {
  render() {
    const { user } = this.props;

    // if (!user) {
    //   return <Redirect to="/" />;
    // }

    const EditButton = ({ }) => (
      <a href="javascript:;" className="edit-btn float-right">
        <i className="material-icons">edit</i>
      </a>
    );

    const SettingsButton = ({ }) => user.role === UserRole.ROOT ? (
      <Button tag={Link} to="/dashboard" outline className="delete-btn float-right m-auto" size="sm" color="primary">
        <i className="md-text material-icons">code</i> Admin
      </Button>
    ) : null;

    return (
      <div className="form-account-container">
        <div className="w-50 card">
          <div className="card-body">
            <div className="form-account-title">
              <img
                alt=""
                width="48"
                height="48"
                className="m-2"
                src={require('../../assets/logo.svg')} />
              <h3 className="h3 m-2 font-weight-normal">
                Account
              </h3>

              <SettingsButton />
            </div>

            <p className="mt-2 card-text text-left">
              {user ? (
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading>Name</ListGroupItemHeading>
                    <ListGroupItemText>
                      {user.name} &nbsp;
                    {user.role !== UserRole.USER ? <UserRoleBadge role={user.role} className="mb-2" /> : null}
                      {user.status !== UserStatus.ACTIVE ? (<UserStatusBadge status={user.status} />) : null}
                      <EditButton />
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>E-mail</ListGroupItemHeading>
                    <ListGroupItemText>{user.email}</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Password</ListGroupItemHeading>
                    <ListGroupItemText>
                      <b> * * * * * * * * * * * * * * * * </b>
                      <EditButton />
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Since</ListGroupItemHeading>
                    <ListGroupItemText>{moment(user.createdAt).format('DD/MM/YYYY[ - ]HH:mm:ss')}</ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              ) : <div style={{ height: 200, width: '100%' }}>&nbsp;</div>}
            </p>
          </div>
          <div className="card-footer text-right">
            <small className="text-muted">
              <img
                alt=""
                width="32"
                height="32"
                className="float-left"
                src={require('../../assets/logo.svg')} />
              <b>Gatekeeper v{process.env.PACKAGE_VERSION}</b>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
