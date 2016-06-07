import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/friendsActions';
import auth from '../utils/firebase/firebaseAuth';
import LoginForm from '../components/account/LoginForm';

class AccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false,
      user: Object.assign({}, props.user)
    };

    //<editor-fold desc="Method Binders">
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignout = this.onSignout.bind(this);
    //</editor-fold>
  }

  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let user = this.state.user;
    user[propKey] = event.target.value;
    this.setState({user});
  }

  onSignout(event) {
    event.preventDefault();
    auth.signOut()
      .then(() => {
      });
  }

  onSubmit(event) {
    event.preventDefault();
    let user = this.state.user;
    auth.signInWithEmail(user.signup_email, user.signup_password)
      .then(user => {
        console.log('login callback, user:');
        console.log(user);
      })
      .catch(err => {
        console.log('login error:');
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row">
        <div className="column">

          <LoginForm
            user={this.state.user}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onSignout={this.onSignout}
          />

        </div>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
AccountPage.propTypes = {
  user: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  let user = {
    signup_email: '',
    signup_password: ''
  };
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
