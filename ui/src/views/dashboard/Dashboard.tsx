import * as React from 'react';
import { Layout } from '../../components';

import './Dashboard.scss';

export default class DashboardView extends React.Component<any, any> {
  render() {
    return (
      <Layout>
        <section className="jumbotron text-center">
          <div className="container pt-4">
            <h1 className="jumbotron-heading pt-4">Welcome to Gatekeeper!</h1>
            <p className="lead text-muted">
              You have <b><span className="text-success">123 users</span> active right now</b>
            </p>
            <p>
              <a href="#" className="btn btn-primary my-2">Setup my Gatekeeper</a>
            </p>
          </div>
        </section>
      </Layout>
    );
  }
}
