import React, {PropTypes} from 'react';


const FriendsListHeader = ({loggedIn, addFriend}) => {
  return (
    <div>
      <div>
        <h2>Friends</h2>
      </div>

      {loggedIn &&
      <div>
        <button onClick={addFriend}>Add a Friend</button>
      </div>}
    </div>
  );
};

FriendsListHeader.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  addFriend: PropTypes.func.isRequired
};

export default FriendsListHeader;
