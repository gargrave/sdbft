import React, {PropTypes} from 'react';

import TextInput from '../../../components/common/TextInput';


const FriendForm = ({article, saving, onChange, onSubmit, onCancel, errors}) => {
  return (
    <form>
      <TextInput
        label="Name of Article"
        name="name"
        value={article.name}
        placeholder="Name of Article"
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        label="Description"
        name="description"
        value={article.description}
        placeholder="Description"
        onChange={onChange}
        error={errors.description}
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
  article: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default FriendForm;
