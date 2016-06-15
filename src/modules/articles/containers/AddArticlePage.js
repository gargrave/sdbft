import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../articlesActions';
import ArticleForm from '../components/ArticleForm';


class AddArticlePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    console.log('onChange');
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('onSubmit');
  }

  onCancel(event) {
    event.preventDefault();
    console.log('onCancel');
  }

  render() {
    return (
      <div>
        <h2>Add an Article</h2>
        <ArticleForm
          article={{}}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          errors={[]}
        />
      </div>
    );
  }
}

AddArticlePage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticlePage);
