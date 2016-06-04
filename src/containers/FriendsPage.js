import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/friendsActions';
import FriendsList from '../components/friend/FriendsList';

import '../styles/friends-page.css';

class FriendsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //<editor-fold desc="Method Binders">
    //</editor-fold>
  }

  /*=============================================
   = Lifecycle Methods
   =============================================*/
  componentDidMount() {
    // load friends list on mounting
    this.props.actions.fetchFriends();
  }


  /*=============================================
   = Render
   =============================================*/
  render() {
    const {friends} = this.props;
    return (
      <div>
        <h1>Friends</h1>
        <FriendsList friends={this.props.friends}/>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
FriendsPage.propTypes = {
  friends: PropTypes.array.isRequired
};

/*=============================================
 = Redux Setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  return {
    friends: state.friends
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // ex: createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(actions, dispatch)
  };
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
