import * as React from 'react';
import { Layout } from '../../components';
import { Session } from 'gatekeeper-sdk';

import './Dashboard.scss';

export interface DashboardViewProps {
  active: any;
  analyticsFetchActive(): Promise<void>;
}

export default class DashboardView extends React.Component<DashboardViewProps, any> {
  protected session: Session;

  constructor(props: DashboardViewProps) {
    super(props);
    this.session = Session.getInstance({});
  }

  componentDidMount() {
    this.session.subscribe(this);

    if (this.session.current && !this.props.active && this.props.analyticsFetchActive) {
      this.props.analyticsFetchActive();
    }
  }

  componentWillUnmount() {
    this.session.unsubscribe(this);
  }

  public update(eventName: string, data: any) {
    if (eventName === Session.EVENT_SESSION_CHANGED && data) {
      this.props.analyticsFetchActive();
    }
  }

  render() {
    const { active } = this.props;
    const devicesCount = (active && active.clients) ? active.clients
      .map(client => client.tokens)
      .reduce((aggr, next) => aggr + next, 0) : 0;

    return (
      <Layout>
        <section className="jumbotron text-center">
          <div className="container pt-4">
            <h1 className="jumbotron-heading pt-4">Welcome to Gatekeeper!</h1>
            <p className="lead text-muted">
              There are <b><span className="text-success">{active.users} users</span> authenticated right now
              in <span className="text-success">{devicesCount} devices</span></b>.
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
