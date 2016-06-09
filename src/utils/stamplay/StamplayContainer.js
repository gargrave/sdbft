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

    auth.init()
      .then(res => {
        if (auth.isLoggedIn()) {
          this.props.authActions.userLoggedIn(res);
        }
      });
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
  friendsActions: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    friendsActions: bindActionCreators(friendsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StamplayContainer);
