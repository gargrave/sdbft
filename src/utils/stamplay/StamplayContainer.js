/* eslint-disable no-undef */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as friendsActions from '../../actions/friendsActions';
import * as authActions from '../../actions/authActions';
import auth from './StamplayAuth';

class StamplayContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    // initialize the auth handler, and call the apprioriate method
    // i.e. are we logged in from a previous session?
    auth.init()
      .then(res => {
        if (auth.isLoggedIn()) {
          this.props.authActions.userLoggedIn(res);
        } else {
          this.props.authActions.userLoggedOut();
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    // watch for friends API refreshes
    if (nextProps.status.needFriendsApiRefresh) {
      this.props.friendsActions.fetchFriends();
    }
  }

  render() {
    return (
      <span></span>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
StamplayContainer.propTypes = {
  status: PropTypes.object.isRequired,
  friendsActions: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    status: state.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    friendsActions: bindActionCreators(friendsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StamplayContainer);
