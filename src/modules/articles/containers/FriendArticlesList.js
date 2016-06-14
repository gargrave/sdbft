import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../articlesActions';
import FriendArticleRow from '../components/FriendArticleRow';


class FriendArticlesList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    console.log('laksdjflkasjdfljk');
    this.props.actions.fetchArticlesForFriend(this.props.friend.id);
  }

  render() {
    const {articles, friend} = this.props;

    function asdf() {
      return <p>fart</p>;
    }

    return (
      <div>
        <h2>{friend.first_name}'s Articles</h2>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {articles.map(article =>
            <FriendArticleRow key={article.id} article={article}/>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

FriendArticlesList.propTypes = {
  actions: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired,
  articles: PropTypes.array
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    friend: ownProps.friend,
    articles: state.articles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendArticlesList);
