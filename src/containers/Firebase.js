import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as friendsActions from '../actions/friendsActions';
import firebase from '../firebaseApi';

class Firebase extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const REF = firebase.database().ref('friends');
    REF.on('value', snapshot => {
      this.props.friendsActions.updateFriends(snapshot.val());
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
Firebase.propTypes = {
  friendsActions: PropTypes.object.isRequired
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
    friendsActions: bindActionCreators(friendsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
