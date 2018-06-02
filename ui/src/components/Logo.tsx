import * as React from 'react';
import { UserRole } from 'gatekeeper-sdk';
import { Badge, BadgeProps } from 'reactstrap';

export interface LogoProps extends BadgeProps {
  alt?: string;
  size?: number;
  className?: string;
}

export const Logo: React.StatelessComponent<LogoProps> = ({ alt, size, ...props }: LogoProps) => (
  <img
    alt={alt || 'Site Logo'}
    className="m-2"
    width={size || 48}
    height={size || 48}
    src={require('../assets/logo.svg')} {...props} />
);
