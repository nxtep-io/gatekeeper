import * as React from 'react';
import * as moment from 'moment';
import { Table } from 'reactstrap';
import { OAuthAccessToken, Observer, Session, PaginatedArray, Pagination } from 'gatekeeper-sdk';
import { Layout, Spinner, UserAgentBadge, PaginationNav } from '../../components';

import './TokenList.scss';

// TODO: Move to config
export const DEFAULT_LIMIT = 25;

export interface TokenListViewProps {
  location: any;
  isLoading?: boolean;
  tokenList?: false | PaginatedArray<OAuthAccessToken>;
  tokensFetchList(pagination: Pagination): Promise<void>;
}

export interface TokenListViewState {
  skip?: number;
  limit?: number;
}

export default class TokenListView
  extends React.Component<TokenListViewProps, TokenListViewState>
  implements Observer {
  private session: Session;

  constructor(props: TokenListViewProps) {
    super(props);
    this.session = Session.getInstance({});

    // Initialize state based on query params
    if (props.location) {
      const params = new URLSearchParams(props.location.search);
      this.state = {
        limit: DEFAULT_LIMIT,
        skip: Number(params.get('skip') || 0),
      };
    } else {
      this.state = {};
    }
  }

  componentWillReceiveProps(nextProps: TokenListViewProps) {
    if (nextProps.location) {
      const params = new URLSearchParams(nextProps.location.search);
      const nextSkip = Number(params.get('skip') || 0);
      if (nextSkip !== this.state.skip) {
        this.setState({ skip: nextSkip }, () => this.refresh());
      }
    }
  }

  componentDidMount() {
    this.session.subscribe(this);

    if (this.session.current && !this.props.tokenList && this.props.tokensFetchList) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    this.session.unsubscribe(this);
  }

  async refresh() {
    const { skip, limit } = this.state;
    this.props.tokensFetchList({ skip, limit });
  }

  public update(eventName: string, data: any) {
    if (eventName === Session.EVENT_SESSION_CHANGED && data) {
      this.refresh();
    }
  }

  render() {
    const tokens = this.props.tokenList || [];

    return (
      <Layout>
        <Spinner visible={this.props.isLoading} />
        <section className="jumbotron text-center">
          <div className="container pt-4">
            <h1 className="jumbotron-heading pt-4">OAuth 2.0 Tokens</h1>
            <p className="lead text-muted">
              There are
              <b> <span className="text-success">{tokens.dataLength} tokens</span> </b>
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
                        <th></th>
                        <th>User</th>
                        <th>Client</th>
                        <th>Created At</th>
                        <th>Expires</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokens.map((token: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <UserAgentBadge
                              userAgent={token.userAgent}
                              expired={new Date(token.expires) < new Date()} />
                          </td>
                          <td>{token.user.name}</td>
                          <td>{token.client.clientId} ({token.client.platform})</td>
                          <td>{token.createdAt.toLocaleString()}</td>
                          <td>{token.expires.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <PaginationNav
                    url="/tokens"
                    skip={this.state.skip}
                    limit={this.state.limit}
                    length={tokens.dataLength} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
