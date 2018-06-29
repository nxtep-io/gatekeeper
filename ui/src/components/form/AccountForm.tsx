import * as React from 'react';
import * as moment from 'moment';

import './AccountForm.scss';
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading, Input } from 'reactstrap';
import { User, UserRole, UserStatus, UserSchema } from 'gatekeeper-sdk';
import { UserStatusBadge, UserRoleBadge } from '../badge';
import EditableListGroupItem from './EditableListGroupItem';

export interface AccountFormProps {
  user?: User;
  isLoading?: string;
  onSubmit(field: string, user: UserSchema): void;
}

export interface AccountFormState {
}

export default class AccountForm extends React.Component<AccountFormProps, AccountFormState> {

  render() {
    const { user, isLoading } = this.props;

    return (
      <ListGroup>
        <ListGroupItem>
          <ListGroupItemHeading>Name</ListGroupItemHeading>
          <EditableListGroupItem
            name="name"
            value={user.name}
            isLoading={isLoading === 'name'}
            onSubmit={value => this.props.onSubmit('name', { ...user, name: value })}
            placeholder="Name" />
          {user.role !== UserRole.USER ? <UserRoleBadge role={user.role} className="mb-2" /> : null}
          {user.status !== UserStatus.ACTIVE ? (<UserStatusBadge status={user.status} />) : null}
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>E-mail</ListGroupItemHeading>
          <ListGroupItemText>{user.email}</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Password</ListGroupItemHeading>
          <EditableListGroupItem
            name="password"
            value={null}
            isLoading={isLoading === 'password'}
            onSubmit={value => this.props.onSubmit('password', { ...user, password: value })}
            placeholder=" * * * * * * * * * * * * * * * * " />
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Since</ListGroupItemHeading>
          <ListGroupItemText>{moment(user.createdAt).format('DD/MM/YYYY[ - ]HH:mm:ss')}</ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
