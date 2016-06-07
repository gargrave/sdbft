import React, {PropTypes} from 'react';

const FriendsListHeader = ({loggedIn, addFriend}) => {
  return (
    <div>
      <div className="row">
        <div className="column">
          <h2>Friends</h2>
        </div>
      </div>
      {loggedIn &&
      <div className="row">
        <div className="column">
          <button onClick={addFriend}>Add a Friend</button>
        </div>
      </div>}
    </div>
  );
};

FriendsListHeader.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  addFriend: PropTypes.func.isRequired
};

export default FriendsListHeader;
