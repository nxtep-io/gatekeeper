import * as React from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import UserList from './users/UserList';
import ClientList from './clients/ClientList';
import TokenList from './tokens/TokenList';
import Dashboard from './dashboard/Dashboard';
import NotFound from './errors/NotFound';
import Account from './auth/Account';

export {
  Login, SignUp, Account,
  UserList, ClientList, TokenList,
  Dashboard,  NotFound,
};

export default {
  Login,
  SignUp,
  Account,
  Dashboard,
  UserList,
  TokenList,
  ClientList,
  NotFound,
};
