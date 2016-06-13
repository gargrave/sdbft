import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const FriendRowLoading = () => {
  return (
    <h5 className="text-center">
      You are not logged in. Please visit the&nbsp;
      <Link to="/account">
        Account Page
      </Link>
      &nbsp;to log in.
    </h5>
  );
};

FriendRowLoading.propTypes = {};

export default FriendRowLoading;
