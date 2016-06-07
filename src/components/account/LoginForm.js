import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({user, onChange, onSubmit, onSignout}) => {
  return (
    <div>
      <h1>Login</h1>
      <form>

        <TextInput
          label="Email"
          value={user.signup_email}
          placeholder="email"
          name="signup_email"
          onChange={onChange}
          error=""
        />

        <PasswordInput
          label="Password"
          value={user.signup_password}
          placeholder="password"
          name="signup_password"
          onChange={onChange}
          error=""
        />

        <input
          type="submit"
          className="button"
          onClick={onSubmit}
        />&nbsp;

        <button
          className="button button-outline float-right"
          onClick={onSignout}
        >Logout
        </button>

      </form>
    </div>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSignout: PropTypes.func.isRequired
};

export default LoginForm;
