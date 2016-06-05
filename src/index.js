/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

import {fetchFriends} from './actions/friendsActions';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import '../node_modules/milligram/dist/milligram.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();
store.dispatch(fetchFriends());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);
