import React, {PropTypes} from 'react';

import FriendRow from './FriendRow';
import FriendRowLoading from './FriendRowLoading';
import FriendRowNotAuth from './FriendRowNotAuth';


const FriendsTable = ({loggedIn, friends}) => {
  return (
    <div className="row">
      <div className="column">

        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Twitter</th>
          </tr>
          </thead>
          <tbody>
          {friends.map(friend =>
            <FriendRow key={friend.id} friend={friend}/>
          )}
          </tbody>
        </table>
        {!loggedIn && <FriendRowNotAuth />}
        {loggedIn && !friends.length && <FriendRowLoading />}

      </div>
    </div>
  );
};

FriendsTable.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  friends: PropTypes.array.isRequired
};

export default FriendsTable;
