import * as hat from 'hat';
import * as React from 'react';
import { UserAgentInformation } from 'gatekeeper-sdk';
import { Badge, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export const UserAgentBody = ({ userAgent }: any) => (
  <React.Fragment>
    {userAgent && userAgent.os ? <p><b>OS: </b>{userAgent.os}</p> : null}
    {userAgent && userAgent.source ? <p>{userAgent.source}</p> : null}
    {!userAgent || !userAgent.source ? (
      <p>The token has to be used at least once for the system to capture its user agent.</p>
    ) : null}
  </React.Fragment>
);

export interface UserAgentProps {
  userAgent: UserAgentInformation;
  expired?: boolean;
  id?: string;
}

export interface UserAgentState {
  isPopoverOpen?: boolean;
}

export default class UserAgent extends React.Component<UserAgentProps, UserAgentState> {
  elem: HTMLElement;
  state: UserAgentState = { isPopoverOpen: false };

  toggle() {
    this.setState({ isPopoverOpen: !this.state.isPopoverOpen });
  }

  render() {
    let icon;
    const { id = hat(), expired, userAgent } = this.props;

    if (userAgent.browser && userAgent.browser.match(/chrome/ig)) {
      icon = 'fab fa-chrome';
    } else if (userAgent.browser && userAgent.browser.match(/safari/ig)) {
      icon = 'fab fa-safari';
    } else if (userAgent.browser && userAgent.browser.match(/postman/ig)) {
      icon = 'fa fa-terminal';
    } else if (userAgent.browser === undefined) {
      icon = 'fa fa-lock';
    } else {
      icon = 'fa fa-question-circle';
    }

    let colorClass;

    if (expired) {
      colorClass = 'text-danger';
    } else if (userAgent.source) {
      colorClass = 'text-primary';
    } else {
      colorClass = 'text-warning';
    }

    return (
      <React.Fragment>
        <a
          href="javascript:;"
          onClick={() => this.toggle()}
          ref={elem => this.elem = elem}
          className={colorClass}>
          <i className={icon} style={{ fontSize: 24 }} />
        </a>
        {this.elem ? (
          <Popover
            placement="right"
            target={this.elem}
            toggle={() => this.toggle()}
            isOpen={this.state.isPopoverOpen} >
            <PopoverHeader>
              {userAgent.browser ? `${userAgent.browser} ${userAgent.version}` : 'Unknown'}
              {expired ? (
                <Badge color="danger" className="float-right">Expired</Badge>
              ) : (userAgent.source ? (
                <Badge color="primary" className="float-right">OK</Badge>
              ) : (
                  <Badge color="warning" className="float-right">Unavailable</Badge>
                ))}
            </PopoverHeader>
            <PopoverBody>
              <UserAgentBody userAgent={userAgent} />
            </PopoverBody>
          </Popover>
        ) : null}
      </React.Fragment>
    );
  }
}
