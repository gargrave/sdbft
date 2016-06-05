import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as IMPORT_ACTIONS from '';

class CreateFriendPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //<editor-fold desc="Method Binders">
    //</editor-fold>
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div>
      </div>
    );
  }
}

/*=============================================
 = Props Validation
 =============================================*/
CreateFriendPage.propTypes = {
  // myProp: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
//<editor-fold desc="Redux Setup">
function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // ex: createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(IMPORT_ACTIONS, dispatch)
  };
}
//</editor-fold>

export default connect(mapStateToProps, mapDispatchToProps)(CreateFriendPage);
