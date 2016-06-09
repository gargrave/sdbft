import React, {PropTypes} from 'react';

const UserInfo = ({user}) => {
  return (
    <div>
      <h2>User Info:
        <small> {user.email}</small>
      </h2>
      <hr/>
      <ul>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Username:</strong> {user.username || 'n/a'}</li>
        <li><strong>Display name:</strong> {user.displayName || 'n/a'}</li>
        <li><strong>Email verified:</strong> {user.emailVerified ? 'yes' : 'no'}</li>
        <li><strong>Profile image:</strong> {user.profileImg || 'n/a'}</li>
      </ul>
      <hr/>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserInfo;
