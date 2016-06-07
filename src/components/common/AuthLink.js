import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthLink = ({text}) => {
  return (
    <Link className="float-right" to="/account">
      Account
    </Link>
  );
};

AuthLink.propTypes = {
};

export default AuthLink;
