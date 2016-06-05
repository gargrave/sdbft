import React, {PropTypes} from 'react';

const FriendsListHeader = () => {
  return (
    <div>
      <div className="row">
        <div className="column">
          <h1>Friends</h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <button>Add a Friend</button>
        </div>
      </div>
    </div>
  );
};

FriendsListHeader.PropTypes = {};

export default FriendsListHeader;
