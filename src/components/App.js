import React, {PropTypes} from 'react';

import Header from './common/Header';
import StamplayContainer from '../utils/stamplay/StamplayContainer';

const App = (props) => {
  return (
    <div className="container">
      <StamplayContainer />
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
