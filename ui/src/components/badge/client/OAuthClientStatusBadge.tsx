import * as React from 'react';
import { OAuthClientStatus } from 'gatekeeper-sdk';
import { Badge } from 'reactstrap';

export interface OAuthClientStatusBadgeProps {
  status: OAuthClientStatus;
}

export const OAuthClientStatusBadge: React.StatelessComponent<OAuthClientStatusBadgeProps> =
  (props: OAuthClientStatusBadgeProps) => {
    const color = (props.status === OAuthClientStatus.ACTIVE ? 'success' : 'default');
    return (
      <Badge color={color}>{props.status}</Badge>
    );
  };
