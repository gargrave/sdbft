import React, {PropTypes} from 'react';

import TextInput from '../common/TextInput';

const FriendForm = ({friend, saving, onChange, onSubmit, onCancel}) => {
  return (
    <form>
      <TextInput
        name="first_name"
        value={friend.first_name}
        placeholder="first name"
        onChange={onChange}
      />

      <TextInput
        name="last_name"
        value={friend.last_name}
        placeholder="last name"
        onChange={onChange}
      />

      <TextInput
        name="email"
        value={friend.email}
        placeholder="email"
        onChange={onChange}
      />

      <TextInput
        name="twitter"
        value={friend.twitter}
        placeholder="twitter"
        onChange={onChange}
      />

      <input
        type="submit"
        className="button"
        disabled={saving}
        onClick={onSubmit}
      />&nbsp;

      <button
        className="button button-outline float-right"
        onClick={onCancel}
      >Cancel
      </button>
    </form>
  );
};

FriendForm.PropTypes = {
  friend: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default FriendForm;
