import * as React from 'react';
import * as moment from 'moment';
import { Table } from 'reactstrap';
import { OAuthClient, Observer, Session, PaginatedArray } from 'gatekeeper-sdk';
import { Layout, Spinner, OAuthClientStatusBadge } from '../../components';

import './ClientList.scss';

export interface ClientListViewProps {
  isLoading?: boolean;
  clientList?: false | PaginatedArray<OAuthClient>;
  clientsFetchList(): Promise<void>;
}

export interface ClientListViewState {
}

export default class ClientListView
  extends React.Component<ClientListViewProps, ClientListViewState>
  implements Observer {
  private session: Session;

  constructor(props: ClientListViewProps) {
    super(props);
    this.session = Session.getInstance({});
  }

  componentDidMount() {
    this.session.subscribe(this);

    if (this.session.current && !this.props.clientList && this.props.clientsFetchList) {
      this.props.clientsFetchList();
    }
  }

  componentWillUnmount() {
    this.session.unsubscribe(this);
  }

  public update(eventName: string, data: any) {
    if (eventName === Session.EVENT_SESSION_CHANGED && data) {
      this.props.clientsFetchList();
    }
  }

  render() {
    const clients = this.props.clientList || [];

    return (
      <Layout>
        <Spinner visible={this.props.isLoading} />
        <section className="jumbotron text-center">
          <div className="container pt-4">
            <h1 className="jumbotron-heading pt-4">OAuth 2.0 Clients</h1>
            <p className="lead text-muted">
              There are
              <b> <span className="text-success">{clients.dataLength} clients</span> </b>
              in the database with
              <b> <span className="text-success">34% active</span></b> in the last 30 days.
            </p>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Client ID</th>
                        <th>Platform</th>
                        <th>Status</th>
                        <th>Last Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client: OAuthClient, index: number) => (
                        <tr key={client.id}>
                          <td>{client.clientId}</td>
                          <td>{client.platform}</td>
                          <td><OAuthClientStatusBadge status={client.status} /></td>
                          <td>Unknown</td>
                          {/* TODO: <td>{moment(user.lastAccess).fromNow()}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
