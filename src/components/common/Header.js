import React from 'react';
import {Link, IndexLink} from 'react-router';

import AuthLink from './AuthLink';

class Header extends React.Component {
  render() {
    return (
      <header className="row">
        <div className="column">

          <IndexLink to="/">Home</IndexLink>&nbsp;|&nbsp;
          <Link to="/friends">Friends</Link>&nbsp;|&nbsp;
          <Link to="/about">About</Link>

          <AuthLink />

        </div>
      </header>
    );
  }
}

export default Header;
