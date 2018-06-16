import * as React from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Account from './auth/Account';
import Recover from './auth/Recover';
import Password from './auth/Password';
import UserList from './users/UserList';
import ClientList from './clients/ClientList';
import TokenList from './tokens/TokenList';
import Dashboard from './dashboard/Dashboard';
import NotFound from './errors/NotFound';

export {
  Login, SignUp, Account, Recover, Password,
  UserList, ClientList, TokenList,
  Dashboard, NotFound,
};

export default {
  Login, SignUp, Account, Recover, Password,
  UserList, TokenList, ClientList,
  Dashboard, NotFound,
};
