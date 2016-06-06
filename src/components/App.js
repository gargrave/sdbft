import React, {PropTypes} from 'react';

import Header from './common/Header';
import Firebase from '../containers/Firebase';

const App = (props) => {
  return (
    <div className="container">
      <Firebase />
      <Header />
      <hr/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
