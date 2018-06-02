import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Store } from 'redux';
import { Session, Observer } from 'gatekeeper-sdk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteProps, Switch, Redirect, Router } from 'react-router-dom';
import Configurations, { AppConfig } from '../config';
import ReduxStore from './store';
import Containers from '../containers';
import { sessionChanged } from './actions';
import { NotFound } from '../views';

import './App.scss';

export interface AppProps {
  config?: AppConfig;
  session?: Session;
}

export interface AppState {
  store: Store;
}

interface PrivateRouteProps extends RouteProps {
}

/**
 * The Main Application definitions.
 */
export default class App extends React.Component<AppProps, AppState> implements Observer {
  session: Session;
  config: AppConfig;
  history: History;
  _isUpdated: boolean = false;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      store: ReduxStore.configureStore(),
    };

    this.config = props.config || Configurations;

    this.session = props.session || Session.getInstance({
      oauth: this.config.oauth,
      http: this.config.ws,
    });

    this.session.subscribe(this);
  }

  public update(eventName: string, data: any) {
    if (eventName === Session.EVENT_SESSION_CHANGED) {
      this.state.store.dispatch(sessionChanged(data));
    }
  }

  render(): JSX.Element {
    return (
      <Provider store={this.state.store}>
        <BrowserRouter
          basename="/ui"
          forceRefresh={false}
          ref={(router: any) => this.history = (router || {}).history} >
          <Switch>
            <Route exact path="/" component={Containers.Login} />
            <Route exact path="/signup" component={Containers.SignUp} />
            <Route exact path="/account" component={Containers.Account} />
            <Route exact path="/users" component={Containers.UserList} />
            <Route exact path="/clients" component={Containers.ClientList} />
            <Route exact path="/tokens" component={Containers.TokenList} />
            <Route exact path="/dashboard" component={Containers.Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
