import React, {PropTypes} from 'react';

const FriendRow = ({friend}) => {
  return (
    <tr>
      <td>{friend.first_name}</td>
      <td>{friend.last_name}</td>
      <td>{friend.email}</td>
      <td>{friend.twitter}</td>
    </tr>
  );
};

FriendRow.PropTypes = {
  friend: PropTypes.object.isRequired
};

export default FriendRow;
