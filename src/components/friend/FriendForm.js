import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';

const FriendForm = ({friend, working, onChange, onSubmit, onCancel, errors}) => {
  return (
    <form>
      <TextInput
        label="First Name"
        name="firstName"
        value={friend.firstName}
        placeholder="first name"
        onChange={onChange}
        error={errors.firstName}
      />

      <TextInput
        label="Last Name"
        name="lastName"
        value={friend.lastName}
        placeholder="last name"
        onChange={onChange}
        error={errors.lastName}
      />

      <TextInput
        label="Email"
        name="email"
        value={friend.email}
        placeholder="email"
        onChange={onChange}
        error={errors.email}
      />

      <TextInput
        label="Twitter"
        name="twitter"
        value={friend.twitter}
        placeholder="twitter"
        onChange={onChange}
        error={errors.twitter}
      />

      <input
        type="submit"
        value="Submit"
        className="button"
        disabled={working}
        onClick={onSubmit}
      />&nbsp;

      <button
        className="button button-outline float-right"
        disabled={working}
        onClick={onCancel}
      >Cancel
      </button>
    </form>
  );
};

FriendForm.propTypes = {
  friend: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default FriendForm;
