import * as React from 'react';

import './Login.scss';

export default class LoginView extends React.Component<any, any> {
  render() {
    return (
      <div className="form-signin-container">
        <form className="form-signin">

          <img
            alt=""
            width="72"
            height="72"
            className="mb-4"
            src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" />

          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

          <label data-for="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
          <label data-for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
