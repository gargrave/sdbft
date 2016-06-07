import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({user, onChange, onSubmit, onSignout}) => {
  return (
    <div>
      <h2>Login</h2>
      <form>

        <TextInput
          label="Email"
          value={user.email}
          placeholder="email"
          name="email"
          onChange={onChange}
          error=""
        />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="password"
          name="pass"
          onChange={onChange}
          error=""
        />

        <input
          type="submit"
          className="button"
          onClick={onSubmit}
        />&nbsp;

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
