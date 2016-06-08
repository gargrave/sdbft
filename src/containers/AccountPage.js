import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../actions/friendsActions';
import auth from '../utils/firebase/firebaseAuth';
import LoginForm from '../components/account/LoginForm';
import CreateUserForm from '../components/account/CreateUserForm';
import UserInfo from '../components/account/UserInfo';

const DISPLAY_STATE = {
  LOGIN: 'LOGIN',
  CREATE: 'CREATE',
  FORGOT: 'FORGOT'
};

class AccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false,
      // user details for existing users
      loginUser: {
        email: '',
        pass: ''
      },
      // user details for new users
      newUser: {
        email: '',
        emailConfirm: '',
        pass: '',
        passConfirm: ''
      },
      // current display state (only relavent when not logged in)
      displayState: DISPLAY_STATE.LOGIN
    };

    //<editor-fold desc="Method Binders">
    this.isLoginState = this.isLoginState.bind(this);
    this.isCreateState = this.isCreateState.bind(this);
    this.isForgotState = this.isForgotState.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.validateCreate = this.validateCreate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onNewUserSubmit = this.onNewUserSubmit.bind(this);
    this.onSignout = this.onSignout.bind(this);
    this.gotoCreateState = this.gotoCreateState.bind(this);
    this.gotoLoginState = this.gotoLoginState.bind(this);
    //</editor-fold>
  }

  /*==============================================
   = DisplayState Methods
   ==============================================*/
  isLoginState() {
    return this.state.displayState === DISPLAY_STATE.LOGIN;
  }

  isCreateState() {
    return this.state.displayState === DISPLAY_STATE.CREATE;
  }

  isForgotState() {
    return this.state.displayState === DISPLAY_STATE.FORGOT;
  }

  gotoCreateState(event) {
    event.preventDefault();
    this.setState({displayState: DISPLAY_STATE.CREATE});
  }

  gotoLoginState(event) {
    event.preventDefault();
    this.setState({displayState: DISPLAY_STATE.LOGIN});
  }

  /*==============================================
   = Validation Methods
   ==============================================*/
  validateLogin() {
    toastr.warning('Implement login validation', 'TODO');
    return true;
  }

  validateCreate() {
    toastr.warning('Implement new user validation', 'TODO');
    return true;
  }

  /*==============================================
   = Event Handlers
   ==============================================*/
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let user = this.isLoginState() ?
      this.state.loginUser : this.state.newUser;
    user[propKey] = event.target.value;
    this.setState({user});
  }

  onSignout(event) {
    event.preventDefault();
    auth.signOut()
      .then(() => {
        // no actions currently needed
      });
  }

  onLoginSubmit(event) {
    event.preventDefault();

    if (this.validateLogin()) {
      let user = this.state.loginUser;
      auth.signInWithEmail(user.email, user.pass)
        .then(loginUser => {
          // clear the stored details
          this.setState({
            loginUser: {
              email: '',
              pass: ''
            }
          });
          toastr.success('Logged in!', 'Success!');
        })
        .catch(err => {
          toastr.error(err.message);
        });
    }
  }

  /**
   * Attempts to create a new user with the provided email/password
   * @param event
   */
  onNewUserSubmit(event) {
    event.preventDefault();

    if (this.validateCreate()) {
      let user = this.state.newUser;
      auth.newUserWithEmail(user.email, user.pass)
        .then(() => {
          toastr.success('Account created!', 'Success!');
        })
        .catch(err => {
          toastr.error(err.message);
        });
    }
  }

  /*==============================================
   = Render
   ==============================================*/
  render() {
    return (
      <div className="row">
        <div className="column">

          {/* show login form when in login state */}
          {!this.props.loggedIn && this.isLoginState() &&
          <LoginForm
            user={this.state.loginUser}
            onChange={this.onChange}
            onSubmit={this.onLoginSubmit}
            onGotoCreate={this.gotoCreateState}
          />}

          {/* show create form when in create state */}
          {!this.props.loggedIn && this.isCreateState() &&
          <CreateUserForm
            user={this.state.newUser}
            onChange={this.onChange}
            onSubmit={this.onNewUserSubmit}
            onGotoLogin={this.gotoLoginState}
          />}

          {/* show user details when logged in */}
          {this.props.loggedIn &&
          <UserInfo
            user={this.props.user}
          />}

          {this.props.loggedIn &&
          <button
            className="button button-outline"
            onClick={this.onSignout}
          >Logout
          </button>}

        </div>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
AccountPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
