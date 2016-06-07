import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../actions/friendsActions';
import auth from '../utils/firebase/firebaseAuth';
import LoginForm from '../components/account/LoginForm';
import UserInfo from '../components/account/UserInfo';

class AccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false,
      loginUser: {
        email: '',
        pass: ''
      }
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
    let loginUser = this.state.loginUser;
    loginUser[propKey] = event.target.value;
    this.setState({loginUser});
  }

  onSignout(event) {
    event.preventDefault();
    auth.signOut()
      .then(() => {
        toastr.success('Logged out!', 'Success!');
      });
  }

  onSubmit(event) {
    event.preventDefault();
    let user = this.state.loginUser;
    auth.signInWithEmail(user.email, user.pass)
      .then(loginUser => {
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

  render() {
    return (
      <div className="row">
        <div className="column">

          {!this.props.loggedIn &&
          <LoginForm
            user={this.state.loginUser}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onSignout={this.onSignout}
          />}

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
