import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import validate from '../../../utils/validate';
import goto from '../../../utils/goto';

import * as actions from '../friendsActions';
import FriendForm from '../components/FriendForm';
import DeleteFriendLink from '../components/DeleteFriendLink';


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

  isValid() {
    let valid = true;
    let errors = {};
    let friend = this.state.friend;

    // validate first name
    let firstNameParams = {required: true, minLength: 2};
    let firstNameVal = validate(friend.first_name, firstNameParams);
    if (!firstNameVal.valid) {
      errors.first_name = firstNameVal.error;
      valid = false;
    }

    // validate last name
    let lastNameParams = {required: true, minLength: 2};
    let lastNameVal = validate(friend.last_name, lastNameParams);
    if (!lastNameVal.valid) {
      errors.last_name = lastNameVal.error;
      valid = false;
    }

    // validate email
    let emailParams = {required: true, format: 'email'};
    let emailVal = validate(friend.email, emailParams);
    if (!emailVal.valid) {
      errors.email = emailVal.error;
      valid = false;
    }

    // validate twitter
    let twitterParams = {format: 'twitter'};
    let twitterVal = validate(friend.twitter, twitterParams);
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
    if (this.isValid()) {
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
          goto.list('friend');
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
    goto.list('friend');
  }

  /**
   * Sends a request to delete the current friend (after confirming with the user)
   * @param event
   */
  onDelete(event) {
    event.preventDefault();

    this.props.actions.deleteFriend(this.state.friend)
      .then(() => {
        toastr.success('Friend deleted!', 'Success!');
        goto.list('friend');
      })
      .catch(err => {
        this.setState({saving: false});
        toastr.error(err);
      });
  }

  //</editor-fold>

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div>
        <h1>{this.props.header}</h1>

        <FriendForm
          friend={this.state.friend}
          saving={this.state.saving}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          errors={this.state.errors}
        />

        {this.props.friend.id && <DeleteFriendLink onDelete={this.onDelete}/>}
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
