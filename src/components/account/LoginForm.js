import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({user, onChange, onSubmit, onGotoCreate, errors}) => {
  return (
    <div>
      <h2>Login</h2>
      <form>

        <TextInput
          label="Email"
          value={user.email}
          placeholder="Email"
          name="email"
          onChange={onChange}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error={errors.password}
        />

        <input
          type="submit"
          value="Submit"
          className="button"
          onClick={onSubmit}
        />&nbsp;

      </form>

      <a href="" onClick={onGotoCreate}>New users click here</a>
    </div>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGotoCreate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default LoginForm;
