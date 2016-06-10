import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/friendsActions';
import FriendsList from '../components/friend/FriendsList';
import FriendsListHeader from '../components/friend/FriendsListHeader';

import '../styles/friends-page.css';

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
    const {friends} = this.props;
    return (
      <div className="row">
        <div className="column">

          <FriendsListHeader
            loggedIn={this.props.loggedIn}
            addFriend={this.onAddFriendClick}
          />

          <FriendsList
            loggedIn={this.props.loggedIn}
            friends={this.props.friends}
          />

        </div>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
FriendsPage.propTypes = {
  status: PropTypes.object.isRequired,
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
    status: state.status,
    loggedIn: !!state.user,
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
