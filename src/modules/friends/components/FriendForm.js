import React, {PropTypes} from 'react';

import TextInput from '../../../components/common/TextInput';


const FriendForm = ({friend, saving, onChange, onSubmit, onCancel, errors}) => {
  return (
    <form>
      <TextInput
        label="First Name"
        name="first_name"
        value={friend.first_name}
        placeholder="First Name"
        onChange={onChange}
        error={errors.first_name}
      />

      <TextInput
        label="Last Name"
        name="last_name"
        value={friend.last_name}
        placeholder="Last Name"
        onChange={onChange}
        error={errors.last_name}
      />

      <TextInput
        label="Email"
        name="email"
        value={friend.email}
        placeholder="Email"
        onChange={onChange}
        error={errors.email}
      />

      <TextInput
        label="Twitter"
        name="twitter"
        value={friend.twitter}
        placeholder="Twitter"
        onChange={onChange}
        error={errors.twitter}
      />

      <input
        type="submit"
        disabled={saving}
        onClick={onSubmit}
      />&nbsp;

      <button
        className="button pseudo"
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
