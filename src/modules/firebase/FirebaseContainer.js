import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as friendsActions from '../friends/friendsActions';
import * as authActions from '../auth/authActions';
import firebase from './firebase';


class Firebase extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      friendsDbRef: ''
    };

    this.onFriendsValueChange = this.onFriendsValueChange.bind(this);
  }

  componentDidMount() {
    // link up auth listeners
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // if logged in, watch for changes to relavent databases
        this.props.authActions.loginSuccess(user);
        this.setState({
          friendsDbRef: firebase.database().ref(`friends/${user.uid}`)
        });
        this.state.friendsDbRef.on('value', this.onFriendsValueChange);
      } else {
        // if logged out, clear all listeners
        this.props.authActions.logoutSuccess();
        if (this.state.friendsDbRef.length > 0) {
          this.state.friendsDbRef.off('value', this.onFriendsValueChange);
        }
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
