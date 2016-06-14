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
    this.props.actions.fetchArticlesForFriend(this.props.friend.id);
  }

  render() {
    const {working, articles, friend} = this.props;

    return (
      <div>
        <h2>{friend.first_name}'s Articles</h2>

        {/* working indicator when awaiting API response */}
        {working &&
        <h3 className="text-center">Loading articles...</h3>
        }

        {/* 'no articles' display for friends with no articles */}
        {!working && articles.length === 0 &&
        <h3 className="text-center">This friend currently has no articles.</h3>
        }

        {/* articles display when friend has at least one */}
        {!working && !!articles.length &&
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
        </table>}

      </div>
    );
  }
}

FriendArticlesList.propTypes = {
  working: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired,
  articles: PropTypes.array
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    working: state.api.articlesApiWorking,
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
