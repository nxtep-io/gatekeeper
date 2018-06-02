import * as React from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import UserList from './users/UserList';
import ClientList from './clients/ClientList';
import Dashboard from './dashboard/Dashboard';
import NotFound from './errors/NotFound';
import Account from './auth/Account';

export {
  Login, SignUp, Account,
  UserList, ClientList,
  Dashboard,  NotFound,
};

export default {
  Login,
  SignUp,
  Account,
  Dashboard,
  UserList,
  ClientList,
  NotFound,
};
