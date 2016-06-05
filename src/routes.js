import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import FriendsPage from './containers/FriendsPage';
import ManageFriendPage from './containers/ManageFriendPage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="friends" component={FriendsPage}/>
    <Route path="friend" component={ManageFriendPage}/>
    <Route path="friend/:id" component={ManageFriendPage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
