import React, {PropTypes} from 'react';

const FriendsListHeader = ({addFriend}) => {
  return (
    <div>
      <div className="row">
        <div className="column">
          <h1>Friends</h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <button onClick={addFriend}>Add a Friend</button>
        </div>
      </div>
    </div>
  );
};

FriendsListHeader.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default FriendsListHeader;
