import React, {PropTypes} from 'react';

import Header from './common/Header';

const App = (props) => {
  return (
    <div className="container">
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
