import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

export default class Layout extends React.Component<any, any> {
  state: any = {};

  toggle() {

  }

  render() {
    return (
      <React.Fragment>
        <Navbar expand="md" fixed="top" color="dark" dark>
          <NavbarBrand tag={Link} to="/dashboard">gatekeeper</NavbarBrand>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/clients">Clients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/tokens">Tokens</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/settings">Settings</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {this.props.children}
      </React.Fragment >
    );
  }
}
