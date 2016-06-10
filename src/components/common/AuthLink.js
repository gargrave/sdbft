import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class AuthLink extends React.Component {
  render() {
    const {loggedIn, user} = this.props;
    return (
      <Link className="float-right" to="/account">
        {!loggedIn && 'Login'}
        {loggedIn && user.email}
      </Link>
    );
  }
}

AuthLink.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default AuthLink;
