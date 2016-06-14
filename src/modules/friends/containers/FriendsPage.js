import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../friendsActions';
import FriendsList from '../components/FriendsList';
import FriendsListHeader from '../components/FriendsListHeader';


class FriendsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //<editor-fold desc="Method Binders">
    this.onAddFriendClick = this.onAddFriendClick.bind(this);
    //</editor-fold>
  }

  /*=============================================
   = Action Handlers
   =============================================*/
  onAddFriendClick(event) {
    event.preventDefault();
    this.gotoAddFriendPage();
  }

  gotoAddFriendPage() {
    browserHistory.push('/friend');
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div>
        <FriendsListHeader
          loggedIn={this.props.loggedIn}
          addFriend={this.onAddFriendClick}
        />

        <FriendsList
          loggedIn={this.props.loggedIn}
          friends={this.props.friends}
        />
      </div>
    );
  }
}

FriendsPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/*=============================================
 = Redux Setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email,
    user: state.user,
    friends: state.friends
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
