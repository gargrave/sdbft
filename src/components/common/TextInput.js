import React, {PropTypes} from 'react';

const TextInput = ({value, placeholder, name, onChange}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

TextInput.PropTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
