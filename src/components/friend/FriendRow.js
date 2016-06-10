import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FriendRow = ({friend}) => {
  return (
    <tr>
      <td><Link to={`/friend/${friend.id}`}>{friend.firstName} {friend.lastName}</Link></td>
      <td>{friend.email}</td>
      <td>{friend.twitter}</td>
    </tr>
  );
};

FriendRow.propTypes = {
  friend: PropTypes.object.isRequired
};

export default FriendRow;
