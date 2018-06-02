import * as React from 'react';
import * as moment from 'moment';
import { Table, Badge } from 'reactstrap';
import { User, Observer, Session, PaginatedArray } from 'gatekeeper-sdk';
import { Layout, Spinner, UserStatusBadge, UserRoleBadge } from '../../components';

import './UserList.scss';

export interface UserListViewProps {
  isLoading?: boolean;
  userList?: false | PaginatedArray<User>;
  usersFetchList(): Promise<void>;
}

export interface UserListViewState {
}

export default class UserListView extends React.Component<UserListViewProps, UserListViewState> implements Observer {
  protected session: Session;

  constructor(props: UserListViewProps) {
    super(props);
    this.session = Session.getInstance({});
  }

  componentDidMount() {
    this.session.subscribe(this);

    if (this.session.current && !this.props.userList && this.props.usersFetchList) {
      this.props.usersFetchList();
    }
  }

  componentWillUnmount() {
    this.session.unsubscribe(this);
  }

  public update(eventName: string, data: any) {
    if (eventName === Session.EVENT_SESSION_CHANGED && data) {
      this.props.usersFetchList();
    }
  }

  render() {
    const users = this.props.userList || [];

    return (
      <Layout>
         <Spinner visible={this.props.isLoading} />
        <section className="jumbotron text-center">
          <div className="container pt-4">
            <h1 className="jumbotron-heading pt-4">Users</h1>
            <p className="lead text-muted">
              There are <b><span className="text-success">{users.dataLength} users</span></b> in the database with
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: User, index: number) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td><UserRoleBadge role={user.role} /></td>
                          <td><UserStatusBadge status={user.status} /></td>
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
