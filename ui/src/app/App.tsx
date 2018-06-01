import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BrowserRouter, Route, RouteProps, Switch, Redirect, Router } from 'react-router-dom';
import Configurations, { AppConfig } from '../config';
import Views from '../views';

import * as jQuery from 'jquery';
(global as any).jQuery = jQuery;

import './App.scss';

export interface AppProps {
  config?: AppConfig;
}

export interface AppState {
}

interface PrivateRouteProps extends RouteProps {
}

/**
 * The Main Application definitions.
 */
export default class App extends React.Component<AppProps, AppState> {
  config: AppConfig;
  history: History;
  _isUpdated: boolean = false;

  constructor(props: AppProps) {
    super(props);
    this.state = {} as any;
    this.config = props.config || Configurations;
  }

  render(): JSX.Element {
    return (
      <BrowserRouter
        forceRefresh={false}
        ref={(router: any) => this.history = (router || {}).history} >
        <Switch>
          <Route exact path="/" component={Views.Login} />
          <Route exact path="/users" component={Views.UserList} />
          <Route exact path="/clients" component={Views.ClientList} />
          <Route exact path="/dashboard" component={Views.Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
