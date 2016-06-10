import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FriendRowEmpty = () => {
  return (
    <h5 className="text-center">
      You haven't added any friends yet!
      <br/>
      Why don't you <Link to="/friend">click here</Link> to add one?
    </h5>
  );
};

FriendRowEmpty.propTypes = {};

export default FriendRowEmpty;
