import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../actions/friendsActions';
import {validate} from '../utils/validators';
import FriendForm from '../components/friend/FriendForm';

class ManageFriendPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      friend: Object.assign({}, props.friend),
      errors: {}
    };

    //<editor-fold desc="Method Binders">
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    //</editor-fold>
  }

  /*=============================================
   = Lifecycle Methods
   =============================================*/
  componentWillReceiveProps(nextProps) {
    if (nextProps.friend && (this.state.friend.id != nextProps.friend.id)) {
      this.setState({friend: nextProps.friend});
    }
  }

  validate() {
    let valid = true;
    let errors = {};
    let first = this.state.friend.firstName;
    let last = this.state.friend.lastName;
    let email = this.state.friend.email;
    let twitter = this.state.friend.twitter;

    // validate first and lst name
    let nameParams = {required: true, maxLength: 100};
    let firstNameVal = validate(first, nameParams);
    if (!firstNameVal.valid) {
      errors.firstName = firstNameVal.error;
      valid = false;
    }
    let lastNameVal = validate(last, nameParams);
    if (!lastNameVal.valid) {
      errors.lastName = lastNameVal.error;
      valid = false;
    }

    // validate email
    let emailParams = {required: true, format: 'email'};
    let emailVal = validate(email, emailParams);
    if (!emailVal.valid) {
      errors.email = emailVal.error;
      valid = false;
    }

    // validate Twitter
    let twitterParams = {required: true, format: 'twitter'};
    let twitterVal = validate(twitter, twitterParams);
    if (!twitterVal.valid) {
      errors.twitter = twitterVal.error;
      valid = false;
    }

    this.setState({errors});
    return valid;
  }

  /*=============================================
   = Action Handlers
   =============================================*/
  //<editor-fold desc="Action Handlers">
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let friend = this.state.friend;
    friend[propKey] = event.target.value;
    this.setState({friend});
  }

  /**
   * Creates or updates a friend based on the current view
   * @param event
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      const updating = !!this.props.friend.id;
      // if we have an existing friend id, update; otherwise create
      let apiCall = updating ?
        this.props.actions.updateFriend :
        this.props.actions.saveFriend;
      // show different message based on state
      let successMsg = 'Friend ' + (updating ? ' updated!' : 'created!');

      apiCall(this.state.friend)
        .then(() => {
          toastr.success(successMsg, 'Success!');
          browserHistory.push('/friends');
        })
        .catch(err => {
          toastr.error(err);
          browserHistory.push('/friends');
        });
    }
  }

  /**
   * Returns to the main friends page
   * @param event
   */
  onCancel(event) {
    event.preventDefault();
    browserHistory.push('/friends/');
  }

  /**
   * Sends a request to delete the current friend (after confirming with the user)
   * @param event
   */
  onDelete(event) {
    event.preventDefault();
    if (confirm('Delete this friend?')) {
      this.props.actions.deleteFriend(this.state.friend.id)
        .then(() => {
          toastr.success('Friend deleted!', 'Success!');
          browserHistory.push('/friends');
        })
        .catch(err => {
          toastr.error(err);
          browserHistory.push('/friends');
        });
    }
  }

  //</editor-fold>

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div className="row">
        <div className="column">

          <h1>{this.props.header}</h1>
          <hr/>
          <FriendForm
            friend={this.state.friend}
            working={this.props.working}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            errors={this.state.errors}
          />
          <hr/>
          {this.props.friend.id &&
          <a href="" onClick={this.onDelete}>Delete this friend</a>
          }

        </div>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
ManageFriendPage.propTypes = {
  working: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  friend: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function getFriendById(friends, id) {
  let friend = friends.filter(friend => friend.id == id);
  if (friend) {
    return friend[0];
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  let friendId = ownProps.params.id;
  let friend = {
    firstName: '',
    lastName: '',
    email: '',
    twitter: ''
  };
  let header = 'Manage Friend';

  if (friendId && state.friends.length > 0) {
    let existingFriend = getFriendById(state.friends, friendId);
    if (existingFriend) {
      friend = existingFriend;
    }
  }

  return {
    working: state.api.friendsApiWorking,
    friend,
    header
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(ManageFriendPage);
