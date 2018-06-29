import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/App';

/**
 * The main client definition, a wrapper around the Application to render it inside a HTML element.
 *
 * @param {String} [elementId] The root element id in the index.html file to be bound to the Application.
 */
export class MainClient {
  root: any;
  constructor(elementId: string = 'react-root') {
    this.root = document.getElementById(elementId);
  }

  /**
   * Initializes and renders the client instance inside the desired element.
   *
   * @param {string} elementId The root element id in the index.html file to be bound to the Application.
   *
   * @returns {MainClient}
   */
  public static init(elementId?: string): MainClient {
    const client = new MainClient(elementId);
    ReactDOM.render(client.render(), client.root);
    return client;
  }

  /**
   * Renders the application.
   *
   * @returns {App}
   */
  render(): JSX.Element {
    return <App />;
  }
}

// Initializes the Main Client as a singleton.
export default MainClient.init();
