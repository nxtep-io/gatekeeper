import * as React from 'react';
import { UserRole } from 'gatekeeper-sdk';
import { Badge, BadgeProps } from 'reactstrap';

export interface UserRoleBadgeProps extends BadgeProps {
  role: UserRole;
  className?: string;
}

export const UserRoleBadge: React.StatelessComponent<UserRoleBadgeProps> = (props: UserRoleBadgeProps) => {
  const { role, ...otherProps } = props;
  const color = (role === UserRole.ROOT ? 'dark' : 'default');
  return (
    <Badge color={color} {...otherProps}>{props.role}</Badge>
  );
};
