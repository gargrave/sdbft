import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({user, onChange, onSubmit, onGotoLogin}) => {
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
          error=""
        />

        <TextInput
          label="Confirm Email"
          value={user.emailConfirm}
          placeholder="Re-enter Email"
          name="emailConfirm"
          onChange={onChange}
          error=""
        />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error=""
        />

        <PasswordInput
          label="Confirm Password"
          value={user.passConfirm}
          placeholder="Confirm Password"
          name="passConfirm"
          onChange={onChange}
          error=""
        />

        <input
          type="submit"
          value="Submit"
          className="button"
          onClick={onSubmit}
        />&nbsp;

      </form>

      <a href="" onClick={onGotoLogin}>Existing users click here</a>
    </div>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGotoLogin: PropTypes.func.isRequired
};

export default LoginForm;
