import * as React from 'react';
import { Alert } from 'reactstrap';
import { User } from 'gatekeeper-sdk';
import { Layout } from '../../components';

import './NotFound.scss';

export interface NotFoundViewProps {
}

export interface NotFoundViewState {
}

export default class NotFoundView extends React.Component<NotFoundViewProps, NotFoundViewState> {

  render() {
    return (
      <Layout>
        <div className="container text-center" style={{ paddingTop: 120 }}>
          <div className="row">
            <div className="col-md-12">
              <div className="error-template mt-4">
                <h1>Oops!</h1>
                <h2 style={{ marginTop: 64 }}>404 Not Found</h2>
                <div className="error-details">
                  Sorry, an error has occured, Requested page not found!
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
