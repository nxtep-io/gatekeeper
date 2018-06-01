import * as React from 'react';
import { Layout } from '../../components';

import './UserList.scss';

export default class UserListView extends React.Component<any, any> {
  render() {
    return (
      <Layout>
        <section className="jumbotron text-center">
          <div className="container pt-4">
            <h1 className="jumbotron-heading pt-4">Users</h1>
            <p className="lead text-muted">
              There are <b><span className="text-success">123 users</span></b> in the database with
              <b> <span className="text-success">34% active</span></b> in the last 30 days.
            </p>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
