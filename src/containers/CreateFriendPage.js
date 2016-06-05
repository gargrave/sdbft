import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/friendsActions';
import FriendForm from '../components/friend/FriendForm';

class CreateFriendPage extends React.Component {
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
    //</editor-fold>
  }

  validate() {
    let valid = true;
    // TODO implement validation
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
  onChange(event) {
    event.preventDefault();

    let propKey = event.target.name;
    let friend = this.state.friend;
    friend[propKey] = event.target.value;
    this.setState({friend});
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      this.setState({saving: true});
      this.props.actions.createFriend(this.state.friend)
        .then(res => {
          browserHistory.push('/friends');
        });
    }
  }

  onCancel(event) {
    event.preventDefault();

    browserHistory.push('/friends/');
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div className="row">
        <div className="column">

          <h1>Add a Friend</h1>
          <hr/>
          <FriendForm
            friend={this.state.friend}
            saving={this.state.saving}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            errors={this.state.errors}
          />

        </div>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
CreateFriendPage.propTypes = {
  friend: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  let friend = {
    first_name: '',
    last_name: '',
    email: '',
    twitter: ''
  };

  return {
    friend
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(CreateFriendPage);
