import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../friendsActions';
import FriendForm from '../components/FriendForm';


class ManageFriendPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      friend: Object.assign({}, props.friend),
      errors: {},
      saving: false
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
    let first = this.state.friend.first_name;
    let last = this.state.friend.last_name;
    let email = this.state.friend.email;
    let twitter = this.state.friend.twitter;

    if (first.length < 2) {
      errors.first_name = 'First name must be a least 2 characters in length.';
      valid = false;
    }

    if (last.length < 2) {
      errors.last_name = 'Last name must be a least 2 characters in length.';
      valid = false;
    }

    if (email.length === 0) {
      errors.email = 'You must provide an email address.';
      valid = false;
    }

    if (twitter.length === 0) {
      errors.twitter = 'You must provide a Twitter handle.';
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

      this.setState({saving: true});
      apiCall(this.state.friend)
        .then(() => {
          toastr.success(successMsg, 'Success!');
          browserHistory.push('/friends');
        })
        .catch(err => {
          this.setState({saving: false});
          toastr.error(err);
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
      this.props.actions.deleteFriend(this.state.friend)
        .then(() => {
          toastr.success('Friend deleted!', 'Success!');
        })
        .catch(err => {
          this.setState({saving: false});
          toastr.error(err);
        });
      browserHistory.push('/friends');
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
            saving={this.state.saving}
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

ManageFriendPage.propTypes = {
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
    first_name: '',
    last_name: '',
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
