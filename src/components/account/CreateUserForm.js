import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({user, working, onChange, onSubmit, onGotoLogin, errors}) => {
  return (
    <div>
      <h2>Create an Account</h2>
      <form>

        <TextInput
          label="Email"
          value={user.email}
          placeholder="Email"
          name="email"
          onChange={onChange}
          error={errors.email}
        />

        <TextInput
          label="Confirm Email"
          value={user.emailConfirm}
          placeholder="Re-enter Email"
          name="emailConfirm"
          onChange={onChange}
          error={errors.emailConfirm}
        />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          value={user.passConfirm}
          placeholder="Confirm Password"
          name="passConfirm"
          onChange={onChange}
          error={errors.passwordConfirm}
        />

        <input
          type="submit"
          value="Submit"
          className="button"
          disabled={working}
          onClick={onSubmit}
        />&nbsp;

      </form>

      <a href="" onClick={onGotoLogin}>Existing users click here</a>
    </div>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGotoLogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default LoginForm;
