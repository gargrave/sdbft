import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

import AccountPage from './modules/account/containers/AccountPage';

import FriendsPage from './modules/friends/containers/FriendsPage';
import ManageFriendPage from './modules/friends/containers/ManageFriendPage';

import AddArticlePage from './modules/articles/containers/AddArticlePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="friends" component={FriendsPage}/>
    <Route path="friend" component={ManageFriendPage}/>
    <Route path="friend/:id/article" component={AddArticlePage}/>
    <Route path="friend/:id" component={ManageFriendPage}/>

    <Route path="account" component={AccountPage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
