import React, {PropTypes} from 'react';

import FriendRow from './FriendRow';
import FriendRowLoading from './FriendRowLoading';

const FriendsTable = ({friends}) => {
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
        {!friends.length && <FriendRowLoading />}

      </div>
    </div>
  );
};

FriendsTable.propTypes = {
  friends: PropTypes.array.isRequired
};

export default FriendsTable;
