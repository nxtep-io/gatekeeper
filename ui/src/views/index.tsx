import * as React from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Account from './auth/Account';
import Recover from './auth/Recover';
import UserList from './users/UserList';
import ClientList from './clients/ClientList';
import TokenList from './tokens/TokenList';
import Dashboard from './dashboard/Dashboard';
import NotFound from './errors/NotFound';

export {
  Login, SignUp, Account, Recover,
  UserList, ClientList, TokenList,
  Dashboard,  NotFound,
};

export default {
  Login, SignUp, Account, Recover,
  UserList, TokenList, ClientList,
  Dashboard, NotFound,
};
