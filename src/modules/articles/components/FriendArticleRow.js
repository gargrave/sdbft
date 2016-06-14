import React, {PropTypes} from 'react';


const FriendArticleRow = ({article}) => {
  return (
    <tr>
      <td>{article.name}</td>
      <td>{article.description}</td>
      <td>{article.status}</td>
    </tr>
  );
};

FriendArticleRow.propTypes = {
  article: PropTypes.object.isRequired
};

export default FriendArticleRow;
