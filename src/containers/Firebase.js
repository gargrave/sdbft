import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as friendsActions from '../actions/friendsActions';
import * as authActions from '../actions/authActions';
import firebase from '../utils/firebase/firebase';

class Firebase extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onFriendsValueChange = this.onFriendsValueChange.bind(this);
  }

  componentDidMount() {
    const REF = firebase.database().ref('friends');
    // link up auth listeners
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.authActions.userLoggedIn(user);
        // add db listeners
        REF.on('value', this.onFriendsValueChange);
      } else {
        // No user is signed in.
        this.props.authActions.userLoggedOut();
        // remove db listeners
        REF.off('value', this.onFriendsValueChange);
      }
    });
  }

  onFriendsValueChange(snapshot) {
    this.props.friendsActions.updateFriends(snapshot.val());
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
Firebase.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
