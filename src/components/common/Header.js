import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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

          <AuthLink
            loggedIn={this.props.loggedIn}
            user={this.props.user}
          />

        </div>
      </header>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.status.loggedIn,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(Header);
