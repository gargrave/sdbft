import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <div>
      <div className="row">
        <div className="column">

          <IndexLink to="/">Home</IndexLink>&nbsp;|&nbsp;
          <Link to="/friends">Friends</Link>&nbsp;|&nbsp;
          <Link to="/about">About</Link>

        </div>
      </div>
    </div>
  );
};

export default Header;
