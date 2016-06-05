import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';

const FriendForm = ({friend, saving, onChange, onSubmit, onCancel, errors}) => {
  return (
    <form>
      <TextInput
        label="First Name"
        name="first_name"
        value={friend.first_name}
        placeholder="first name"
        onChange={onChange}
        error={errors.first_name}
      />

      <TextInput
        label="Last Name"
        name="last_name"
        value={friend.last_name}
        placeholder="last name"
        onChange={onChange}
        error={errors.last_name}
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
        className="button"
        disabled={saving}
        onClick={onSubmit}
      />&nbsp;

      <button
        className="button button-outline float-right"
        disabled={saving}
        onClick={onCancel}
      >Cancel
      </button>
    </form>
  );
};

FriendForm.propTypes = {
  friend: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default FriendForm;
