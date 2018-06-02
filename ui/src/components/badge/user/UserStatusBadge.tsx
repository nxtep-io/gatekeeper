import * as React from 'react';
import { UserStatus } from 'gatekeeper-sdk';
import { Badge } from 'reactstrap';

export interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export const UserStatusBadge: React.StatelessComponent<UserStatusBadgeProps> = (props: UserStatusBadgeProps) => {
  const { status, ...otherProps } = props;
  const color = (status === UserStatus.ACTIVE ? 'success' : 'default');
  return (
    <Badge color={color} {...otherProps}>{status}</Badge>
  );
};
