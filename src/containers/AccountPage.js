import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../actions/authActions';
import {validate} from '../utils/validators';
import auth from '../utils/stamplay/StamplayAuth';
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
      // error messages for forms
      errors: {
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: ''
      },
      // current display state (only relavent when not logged in)
      displayState: DISPLAY_STATE.LOGIN
    };

    //<editor-fold desc="Method Binders">
    this.isLoginState = this.isLoginState.bind(this);
    this.isCreateState = this.isCreateState.bind(this);
    this.isForgotState = this.isForgotState.bind(this);
    this.validateUserData = this.validateUserData.bind(this);
    this.validateUserDataWithConfirm = this.validateUserDataWithConfirm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitNewUser = this.onSubmitNewUser.bind(this);
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
    this.setState({
      newUser: {email: '', emailConfirm: '', pass: '', passConfirm: ''},
      errors: {},
      displayState: DISPLAY_STATE.CREATE
    });
  }

  gotoLoginState(event) {
    event.preventDefault();
    this.setState({
      loginUser: {email: '', pass: ''},
      errors: {},
      displayState: DISPLAY_STATE.LOGIN
    });
  }

  /*==============================================
   = Validation Methods
   ==============================================*/
  /**
   * Validates the data before submitting it for login; note that the data
   * is also validated on the server, so this is merely a first line of defense.
   * @returns {boolean} Whether the data is valid
   */
  validateUserData(user) {
    let valid = true;
    let errors = {};

    // validate email
    let emailParams = {required: true, format: 'email'};
    let emailVal = validate(user.email, emailParams);
    if (!emailVal.valid) {
      errors.email = emailVal.error;
      valid = false;
    }

    // validate password
    let passParams = {minLength: 6};
    let passVal = validate(user.pass, passParams);
    if (!passVal.valid) {
      errors.password = passVal.error;
      valid = false;
    }

    this.setState({errors});
    return valid;
  }

  /**
   * Validates the data before submitting it for creating a user; note that the data
   * is also validated on the server, so this is merely a first line of defense.
   * @returns {boolean} Whether the data is valid
   */
  validateUserDataWithConfirm(user) {
    let valid = true;
    let errors = {};
    let email = user.email;
    let emailConfirm = user.emailConfirm;
    let pass = user.pass;
    let passConfirm = user.passConfirm;

    // validate email
    let emailParams = {required: true, format: 'email'};
    let emailVal = validate(user.email, emailParams);
    if (!emailVal.valid) {
      errors.email = emailVal.error;
      valid = false;
    } else if (email !== emailConfirm) {
      errors.email = 'Emails do not match';
      errors.emailConfirm = errors.email;
      valid = false;
    }

    // validate password
    let passParams = {minLength: 6};
    let passVal = validate(user.pass, passParams);
    if (!passVal.valid) {
      errors.password = passVal.error;
      valid = false;
    } else if (pass !== passConfirm) {
      errors.password = 'Passwords do not match';
      errors.passwordConfirm = errors.password;
      valid = false;
    }

    this.setState({errors});
    return valid;
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

  /**
   * Logs out the current user
   * @param event
   */
  onSignout(event) {
    event.preventDefault();
    this.props.actions.authAjaxStart();
    auth.logout()
      .then(() => {
        this.props.actions.logoutSuccess();
      });
  }

  /**
   * Attempts to login the user with the entered credentials
   * @param event
   */
  onSubmitLogin(event) {
    event.preventDefault();

    if (this.validateUserData(this.state.loginUser)) {
      let credentials = {
        email: this.state.loginUser.email,
        password: this.state.loginUser.pass
      };
      this.props.actions.authAjaxStart();
      auth.login(credentials)
        .then(res => {
          this.props.actions.loginSuccess(res);
          // clear the previously-held credentials
          this.setState({loginUser: {email: '', pass: ''}});
          toastr.success('Logged in!', 'Success!');
        }, err => {
          this.props.actions.loginError(err);
          toastr.error(err, 'Error!');
        });
    }
  }

  /**
   * Attempts to create a new user with the provided email/password
   * @param event
   */
  onSubmitNewUser(event) {
    event.preventDefault();

    if (this.validateUserDataWithConfirm(this.state.newUser)) {
      let credentials = {
        email: this.state.newUser.email,
        password: this.state.newUser.pass
      };
      this.props.actions.authAjaxStart();
      auth.createUser(credentials)
        .then(res => {
          this.props.actions.loginSuccess(res);
          // clear the previously-held credentials
          this.setState({
            newUser: {
              email: '', emailConfirm: '',
              pass: '', passConfirm: ''
            }
          });
          toastr.success('Account created!', 'Success!');
        }, err => {
          this.props.actions.loginError(err);
          toastr.error(err, 'Error!');
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
            working={this.props.working}
            onChange={this.onChange}
            onSubmit={this.onSubmitLogin}
            onGotoCreate={this.gotoCreateState}
            errors={this.state.errors}
          />}

          {/* show create form when in create state */}
          {!this.props.loggedIn && this.isCreateState() &&
          <CreateUserForm
            user={this.state.newUser}
            working={this.props.working}
            onChange={this.onChange}
            onSubmit={this.onSubmitNewUser}
            onGotoLogin={this.gotoLoginState}
            errors={this.state.errors}
          />}

          {/* show user details when logged in */}
          {this.props.loggedIn &&
          <UserInfo
            user={this.props.user}
            working={this.props.working}
          />}

          {this.props.loggedIn &&
          <button
            className="button button-outline"
            disabled={this.props.working}
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
  actions: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  return {
    working: state.api.authApiWorking,
    loggedIn: state.status.loggedIn,
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
